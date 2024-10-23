import { yupResolver } from "@hookform/resolvers/yup";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import _, { set } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { boolean, InferType, object, string } from "yup";
import { Model } from "~/components";
import { formatMoney, splitProductImageURLs } from "~/components/utils";
import { checkout, removeFromCart, useGetDistricts, useGetInCart, useGetProfile, useGetProvinces, useGetWards } from "~/data";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return json({}, { status: 200 });
}

const schema = object({
  name: string().required("Tên là bắt buộc"),
  phone: string().required("Số điện thoại là bắt buộc"),
  email: string().email("Email không hợp lệ").required("Email là bắt buộc"),
  province: string()
    .required("Thành phố là bắt buộc"),
  district: string()
    .required("Quận là bắt buộc"),
  ward: string()
    .required("Phường là bắt buộc"),
  street: string()
    .required("Địa chỉ là bắt buộc"),
  deliveryToDifferentAddress: boolean(),
  receiverName: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Họ và tên người nhận là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  receiverPhone: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Số điện thoại người nhận là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  receiverProvince: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Thành phố là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  receiverDistrict: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Quận là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  receiverWard: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Phường là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  receiverStreet: string().when("deliveryToDifferentAddress", {
    is: true,
    then: schema => schema.required("Địa chỉ là bắt buộc"),
    otherwise: schema => schema.notRequired()
  }),
  paymentMethod: string().required("Phương thức thanh toán là bắt buộc"),
});


const resolver = yupResolver(schema);
type CheckoutForm = InferType<typeof schema>;

// const defaultAddress = {
//   name: "Nguyễn Văn A",
//   phone: "(+84)234.567.890",
//   email: "nguyena123456789@gmail.com",
//   province: "HCM",
//   district: "Quận 1",
//   ward: "Phường 1",
//   street: "1/2/3/4/5 Đường ABC",
// };

const paymentMethods = [
  {
    value: "CashOnDelivery",
    label: "Thanh toán khi nhận hàng",
  },
  // {
  //   value: "VNPay",
  //   label: "Thanh toán qua VNPay",
  // },
  {
    value: "PayOS",
    label: "Thanh toán qua PayOS",
  }
];

export default function Checkout() {
  const profile = useGetProfile();
  const getInCart = useGetInCart(profile.data?.user?.token || '');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const splitAddress = useMemo(() => {
    return _.split(profile.data?.detail.address || '', ', ')
  }, [profile.data?.detail.address]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageParams = queryParams.get('message');
  const messageType = queryParams.get('type');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<CheckoutForm>({
    resolver,
    mode: "onChange",
    // defaultValues: {
    //   name: profile.data?.detail.name,
    //   phone: profile.data?.detail.phoneNumber,
    //   email: profile.data?.detail.email,
    //   province: splitAddress[3] || '',
    //   district: splitAddress[2] || '',
    //   ward: splitAddress[1] || '',
    //   street: splitAddress[0] || '',
    // },
  });

  const provinces = useGetProvinces();
  const districts = useGetDistricts();
  const districtId = watch('receiverDistrict');
  const wards = useGetWards(Number(districtId));
  const provinceId = watch('receiverProvince');

  const mapProvinces = useMemo(() => {
    return _.mapKeys(provinces.data?.data, it => it.ProvinceID)
  }, [provinces.data?.data]);

  const mapDistricts = useMemo(() => {
    return _.mapKeys(districts.data?.data, it => it.DistrictID)
  }, [districts.data?.data]);

  const mapWards = useMemo(() => {
    return _.mapKeys(wards.data?.data, it => it.WardCode)
  }, [districts.data?.data, wards.data?.data]);

  const filterDistrictsByProviceId = useMemo(() => {
    return _(districts.data?.data)
      .filter(it => it.ProvinceID === Number(provinceId))
      .value()
  }, [watch('receiverProvince'), districts.data?.data]);

  const cartItems = useMemo(() => {
    if (!getInCart.data) {
      return [];
    }
    return _.map(getInCart.data, (item) => {
      const { orderDetailId, productImageURL, productName, unitPrice, quantity } = item;
      let topImage = '';
      let bodyImage = '';
      let strapImage = '';

      if (productImageURL) {
        const images = splitProductImageURLs(productImageURL);
        topImage = images.top;
        bodyImage = images.body;
        strapImage = images.strap;
      }

      return {
        id: orderDetailId,
        topImage,
        bodyImage,
        strapImage,
        name: productName,
        price: unitPrice,
        quantity,
        orderDetailId,
      };
    })
  }, [getInCart.data]);

  const calculateTotalPrice = () => {
    const itemTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingFee = itemTotal >= 1000000 ? 0 : 20000;
    return {
      itemTotal,
      total: itemTotal + shippingFee,
      shippingFee,
    };
  };

  const { itemTotal, total, shippingFee } = calculateTotalPrice();

  const deleteFromCart = async (orderDetailId: string) => {
    try {
      let response = await removeFromCart(profile.data?.user?.token || '' || '', orderDetailId);
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ['in-cart']
        })
        message
      }
    } catch (error) {
      console.log("Failed to remove item from cart:", error);
    }
  };

  const isDifferentAddress = watch("deliveryToDifferentAddress", false);

  const onSubmit = async (data: CheckoutForm) => {
    console.log('data', data);
    setIsLoading(true);
    try {
      let response = await checkout(profile.data?.user?.token || '', {
        returnUrl: `${window.location.origin}/payos/checkout-process`,
        cancelUrl: `${window.location.origin}/payos/checkout-process`,
        paymentMethod: data.paymentMethod,
      });

      if (response.status !== "Failed" && response.url.checkoutUrl && data.paymentMethod === 'PayOS') {
        setIsLoading(false);
        window.location.href = response.url.checkoutUrl;
      }
      else if (response.status === "Failed") {
        message.error(response.message)
      }
      else {
        setIsLoading(false);
        navigate('/checkout/success');
      }
    } catch (error: any) {
      message.error(error?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue('name', profile.data?.detail.name || "");
    setValue('phone', profile.data?.detail.phoneNumber || "");
    setValue('email', profile.data?.detail.email || "");
    setValue('province', splitAddress[3] || "");
    setValue('district', splitAddress[2] || "");
    setValue('ward', splitAddress[1] || "");
    setValue('street', splitAddress[0] || "");
  }, [profile.data?.detail])

  useEffect(() => {
    if (messageParams) {
      if (messageType === 'error') {
        message.error(messageParams);
      }
    }
  }, [location.search]);

  return (
    <main className="mt-[--m-header-top]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#0055C3] w-full">
          <div className="p-12 flex space-x-16">
            <div className="w-1/2 bg-white rounded-3xl p-6">
              <div className="border-b-2">
                <span className="text-lg font-semibold text-black">
                  Thông tin cá nhân
                </span>
                <div className="flex p-4">
                  <img
                    className="w-20 h-20"
                    src="/images/avatar.png"
                    alt="Profile"
                  />
                  <div className="p-4">
                    <span className="text-black">{profile.data?.detail.name} ({profile.data?.detail.email})</span>
                    <div>
                      <Link to={'/logout'}>Log out</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b-2">
                <span className="text-lg font-semibold text-black">
                  Thông tin thanh toán
                </span>
                <div className="p-4 space-y-5">
                  <input
                    type="text"
                    defaultValue={profile.data?.detail.name}
                    disabled
                    className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                  />
                  {errors.province && (
                    <p className="text-red-500 text-xs">
                      Thông tin địa chỉ không đầy đủ, vui lòng nhấn vào <Link to={'/profile/address'} className="font-bold">đây</Link> để cập nhật
                    </p>
                  )}
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      defaultValue={profile.data?.detail.phoneNumber}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    />

                    <input
                      type="text"
                      defaultValue={profile.data?.detail.email}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <select
                      defaultValue={splitAddress[3]}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value={splitAddress[3]}>{splitAddress[3]}</option>
                      <option value="HN">Hà Nội</option>
                      <option value="DN">Đà Nẵng</option>
                    </select>

                    <select
                      defaultValue={splitAddress[2]}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value={splitAddress[2]}>{splitAddress[2]}</option>
                      <option value="Quận 2">Quận 2</option>
                      <option value="Quận 3">Quận 3</option>
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <select
                      defaultValue={splitAddress[1]}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value={splitAddress[1]}>{splitAddress[1]}</option>
                    </select>

                    <input
                      type="text"
                      {...register('street')}
                      defaultValue={splitAddress[0]}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("deliveryToDifferentAddress")}
                    />
                    <span>Giao hàng đến địa chỉ khác</span>
                  </div>

                  {isDifferentAddress && (
                    <>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Họ và tên người nhận"
                          {...register("receiverName")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        />
                        {errors.receiverName && (
                          <p className="text-red-500">
                            {errors.receiverName.message}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="Số điện thoại người nhận"
                          {...register("receiverPhone")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        />
                        {errors.receiverPhone && (
                          <p className="text-red-500">
                            {errors.receiverPhone.message}
                          </p>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <select
                          {...register("receiverProvince")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn thành phố</option>
                          {_.map(provinces.data?.data, (province, index) => (
                            <option key={index} value={province.ProvinceID}>{province.ProvinceName}</option>
                          ))}
                        </select>
                        {errors.receiverProvince && (
                          <p className="text-red-500">
                            {errors.receiverProvince.message}
                          </p>
                        )}

                        <select
                          {...register("receiverDistrict")}
                          disabled={!watch('receiverProvince')}
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn quận</option>
                          {_.map(filterDistrictsByProviceId, (district, index) => (
                            <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
                          ))}
                        </select>
                        {errors.receiverDistrict && (
                          <p className="text-red-500">
                            {errors.receiverDistrict.message}
                          </p>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <select
                          {...register("receiverWard")}
                          disabled={!watch('receiverDistrict')}
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn phường</option>
                          {_.map(wards.data?.data, (ward, index) => (
                            <option key={index} value={ward.WardCode}>{ward.WardName}</option>
                          ))}
                        </select>
                        {errors.receiverWard && (
                          <p className="text-red-500">
                            {errors.receiverWard.message}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="123 Đường Nguyễn Huệ"
                          {...register("receiverStreet")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        />
                        {errors.receiverStreet && (
                          <p className="text-red-500">
                            {errors.receiverStreet.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className=" ">
                <span className="text-lg font-semibold text-black">
                  Phương thức thanh toán
                </span>
                <div className="space-y-4">
                  {_.map(paymentMethods, (method, index) => (
                    <div key={index} className="flex items-center ">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value={method.value}
                        {...register("paymentMethod")}
                        className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                      />
                      <label htmlFor="default-radio-1" className="ml-2">
                        {method.label}
                      </label>
                    </div>
                  ))}
                  {/* <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value=""
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                    />
                    <label htmlFor="default-radio-2" className="ml-2">
                      Chuyển khoản ngân hàng
                    </label>
                  </div> */}
                  {/* <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="PayOS"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                    />
                    <label htmlFor="default-radio-2" className="ml-2">
                      Thanh toán qua PayOS
                    </label>
                  </div> */}
                  <div className="flex items-center space-x-2 ">
                    <input required type="checkbox" name="" id="" className="rounded-sm"></input>
                    <p>
                      Tôi đã đọc và đồng ý với{" "}
                      <span className="text-[#0055c3] font-semibold">
                        điều khoản và điều kiện{" "}
                      </span>
                      của website*
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-56 flex items-center justify-center border-2 rounded-md h-10 text-white bg-[#0055c3] font-semibold"
                >
                  {isLoading ?? <img src="/icons/loading.svg" alt="loading" className="w-7 h-7" />}
                  <span>Thanh Toán</span>
                </button>
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="bg-white h-fit  rounded-3xl p-8 ">
                <div className="border-b-2 pb-7 flex flex-col gap-4">
                  {_.map(cartItems, (item, index) => {
                    return (
                      <div key={index} className="flex">
                        <div className="w-1/3 bg-[#dbdbcf]">
                          <div className="w-32 h-64 ml-12 relative flex justify-between items-center">
                            <div className="absolute inset-0 max-lg:right-2/3 left-1/3 bottom-2/3">
                              {item.bodyImage && item.strapImage ? (
                                <Model
                                  topImage={item.topImage}
                                  bodyImage={item.bodyImage}
                                  strapImage={item.strapImage}
                                  width="300px"
                                />
                              ) : (
                                <img src={item.topImage} alt={item.name} width="100px" />
                              )}
                            </div>

                          </div>
                        </div>
                        <div className="w-2/3">
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between ">
                              <div>
                                <p className="text-black">
                                  Bình giữ nhiệt
                                  <span className="font-semibold"> {item.name}</span>
                                </p>
                              </div>
                              <div className="flex space-x-4">
                                <p className="text-black">{formatMoney(item.price)}</p>
                                <button>Sửa</button>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => {
                                    deleteFromCart(item.orderDetailId);
                                  }}
                                >Xóa
                                </div>
                              </div>
                            </div>
                            {/* <div>
                              <p className="">Dịch vụ đi kèm</p>

                              <div className="flex justify-between pl-3">
                                <div>
                                  <p className="">
                                    Viết thư tay:{" "}
                                    <span className="font-semibold">
                                      Sinh nhật vui vẻ !
                                    </span>
                                  </p>
                                  <p className="">Gói quà</p>
                                </div>
                                <div>
                                  <div className="flex space-x-4">
                                    <p className="text-black">?VND</p>
                                    <button>Sửa</button>
                                    <button>Xóa</button>
                                  </div>
                                  <div className="flex space-x-4">
                                    <p className="text-black">?VND</p>
                                    <button>Sửa</button>
                                    <button>Xóa</button>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex space-x-3 justify-center pt-5 border-b-2 pb-5">
                  <input type="text" placeholder="Mã Ego Flask Voucher" className="w-56 h-10 border border-[#dbdbcf]   rounded-md bg-[#f9f8f7]" />
                  <button type="button" className=" w-24 h-10 border border-[#dbdbcf]  rounded-md bg-[#f9f8f7]">
                    Áp dụng
                  </button>
                </div>
                <div className="pt-5 flex justify-between border-b-2 pb-5">
                  <div className="text-black font-semibold">
                    <p>Tạm tính</p>
                    <p>Phí giao hàng</p>
                  </div>

                  <div className="text-black font-semibold">
                    <p>{formatMoney(itemTotal)}</p>
                    <p>{formatMoney(shippingFee)}</p>
                  </div>
                </div>
                <div className="text-black font-semibold flex justify-between pt-5">
                  <p>Tổng thanh toán</p>
                  <p>{formatMoney(total)}</p>
                </div>
              </div>
              {/* <Link to={'#'} className="bg-[#0055C3] text-white pt-10 flex space-x-3 ">
                <div className="h-2 w-2 pt-1">
                  <img src="/icons/back.png" alt="" className="w-full" />
                </div>

                <p>Quay lại giỏ hàng</p>
              </Link> */}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
