import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { boolean, InferType, object, string } from "yup";
import { Model } from "~/components";
import { formatMoney, splitProductImageURLs } from "~/components/utils";
import { removeFromCart, useGetInCart, useGetProfile } from "~/data";

const schema = object({
  name: string().required("Tên là bắt buộc"),
  phone: string().required("Số điện thoại là bắt buộc"),
  email: string().email("Email không hợp lệ").required("Email là bắt buộc"),
  city: string().required("Thành phố là bắt buộc"),
  district: string().required("Quận là bắt buộc"),
  ward: string().required("Phường là bắt buộc"),
  street: string().required("Địa chỉ là bắt buộc"),
  deliveryToDifferentAddress: boolean(),
  receiverName: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Họ và tên người nhận là bắt buộc") : schema
  ),
  receiverPhone: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Số điện thoại người nhận là bắt buộc") : schema
  ),
  receiverCity: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Thành phố là bắt buộc") : schema
  ),
  receiverDistrict: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Quận là bắt buộc") : schema
  ),
  receiverWard: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Phường là bắt buộc") : schema
  ),
  receiverStreet: string().when("deliveryToDifferentAddress", (deliveryToDifferentAddress, schema) =>
    deliveryToDifferentAddress ? schema.required("Địa chỉ là bắt buộc") : schema
  ),
  paymentMethod: string().required("Phương thức thanh toán là bắt buộc"),
});


const resolver = yupResolver(schema);
type CheckoutForm = InferType<typeof schema>;

export default function Checkout() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CheckoutForm>({
    resolver,
    mode: "onChange",
  });
  const profile = useGetProfile();
  const getInCart = useGetInCart(profile.data?.user?.token || '');
  const queryClient = useQueryClient();

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
      }
    } catch (error) {
      console.log("Failed to remove item from cart:", error);
    }
  };

  const isDifferentAddress = watch("deliveryToDifferentAddress", false);

  const defaultAddress = {
    name: "Nguyễn Văn A",
    phone: "(+84)234.567.890",
    email: "nguyena123456789@gmail.com",
    city: "HCM",
    district: "Quận 1",
    ward: "Phường 1",
    street: "1/2/3/4/5 Đường ABC",
  };

  const onSubmit = (data: CheckoutForm) => {
    console.log('data', data);
  };

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
                    src="/images/Frame 38.png"
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
                      defaultValue={defaultAddress.city}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value="HCM">Thành phố Hồ Chí Minh</option>
                      <option value="HN">Hà Nội</option>
                      <option value="DN">Đà Nẵng</option>
                    </select>

                    <select
                      defaultValue={defaultAddress.district}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value="Quận 1">Quận 1</option>
                      <option value="Quận 2">Quận 2</option>
                      <option value="Quận 3">Quận 3</option>
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <select
                      defaultValue={defaultAddress.ward}
                      disabled
                      className="w-full rounded-md border-[#dbdbcf] bg-[#f9f8f7]"
                    >
                      <option value="Phường 1">Phường 1</option>
                      <option value="Phường 2">Phường 2</option>
                      <option value="Phường 3">Phường 3</option>
                    </select>

                    <input
                      type="text"
                      defaultValue={defaultAddress.street}
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
                          {...register("receiverCity")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn thành phố</option>
                          <option value="HCM">Thành phố Hồ Chí Minh</option>
                          <option value="HN">Hà Nội</option>
                          <option value="DN">Đà Nẵng</option>
                        </select>
                        {errors.receiverCity && (
                          <p className="text-red-500">
                            {errors.receiverCity.message}
                          </p>
                        )}

                        <select
                          {...register("receiverDistrict")}
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn quận</option>
                          <option value="Quận 1">Quận 1</option>
                          <option value="Quận 2">Quận 2</option>
                          <option value="Quận 3">Quận 3</option>
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
                          className="w-full rounded-md border-[#dbdbcf]"
                        >
                          <option value="">Chọn phường</option>
                          <option value="Phường 1">Phường 1</option>
                          <option value="Phường 2">Phường 2</option>
                          <option value="Phường 3">Phường 3</option>
                        </select>
                        {errors.receiverWard && (
                          <p className="text-red-500">
                            {errors.receiverWard.message}
                          </p>
                        )}

                        <input
                          type="text"
                          placeholder="1/2/3/4/5 Đường ABC"
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
                  <div className="flex items-center ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                    />
                    <label htmlFor="default-radio-1" className="ml-2">
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                    />
                    <label htmlFor="default-radio-2" className="ml-2">
                      Chuyển khoản ngân hàng
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                    />
                    <label htmlFor="default-radio-2" className="ml-2">
                      Thanh toán qua Momo
                    </label>
                  </div>
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
                  type="submit"
                  className="w-56 border-2 rounded-md h-10 text-white bg-[#0055c3] font-semibold"
                >
                  Thanh Toán
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
                                <button
                                  onClick={() => {
                                    deleteFromCart(item.orderDetailId);
                                  }}
                                >Xóa</button>
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
                  <button className="w-56 h-10 border border-[#dbdbcf]   rounded-md bg-[#f9f8f7]">
                    Mã Ego Flask Voucher
                  </button>
                  <button className=" w-24 h-10 border border-[#dbdbcf]  rounded-md bg-[#f9f8f7]">
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
              <button className="bg-[#0055C3] text-white pt-10 flex space-x-3 ">
                <div className="h-2 w-2 pt-1">
                  <img src="/icons/back.png" alt="" className="w-full" />
                </div>

                <p>Quay lại giỏ hàng</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
