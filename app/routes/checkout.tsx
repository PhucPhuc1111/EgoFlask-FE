import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType, object, string, boolean } from "yup";
import { useEffect } from "react";

const schema = object({
  name: string().required("Tên là bắt buộc"),
  phone: string().required("Số điện thoại là bắt buộc"),
  email: string().email("Email không hợp lệ").required("Email là bắt buộc"),
  city: string().required("Thành phố là bắt buộc"),
  district: string().required("Quận là bắt buộc"),
  ward: string().required("Phường là bắt buộc"),
  street: string().required("Địa chỉ là bắt buộc"),
  deliveryToDifferentAddress: boolean(),
});

const resolver = yupResolver(schema);
type CheckoutForm = InferType<typeof schema>;

export default function Checkout() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<CheckoutForm>({
    resolver,
    mode: "onChange",
  });

  const isDifferentAddress = watch("deliveryToDifferentAddress", false);

  const defaultAddress = {
    name: "Nguyễn Văn A",
    phone: "(+84)234.567.890",
    email: "nguyena123456789@gmail.com",
    city: "HCM",
    district: "Quan1",
    ward: "Phuong1",
    street: "1/2/3/4/5 Đường ABC",
  };


  const cities = [
    { value: "HCM", label: "Thành phố Hồ Chí Minh" },
    { value: "HN", label: "Hà Nội" },
    { value: "DN", label: "Đà Nẵng" },
  ];

  const districts = [
    { value: "Quan1", label: "Quận 1" },
    { value: "Quan2", label: "Quận 2" },
    { value: "Quan3", label: "Quận 3" },
  ];

  const wards = [
    { value: "Phuong1", label: "Phường 1" },
    { value: "Phuong2", label: "Phường 2" },
    { value: "Phuong3", label: "Phường 3" },
  ];

 
  useEffect(() => {
    if (!isDifferentAddress) {
      setValue("name", defaultAddress.name);
      setValue("phone", defaultAddress.phone);
      setValue("email", defaultAddress.email);
      setValue("city", defaultAddress.city);
      setValue("district", defaultAddress.district);
      setValue("ward", defaultAddress.ward);
      setValue("street", defaultAddress.street);
    }
  }, [isDifferentAddress, setValue]);

  const onSubmit = (data: CheckoutForm) => {
    console.log("data", data);
  };

  return (
    <main className="mt-[--m-header-top]">
      <div className="bg-[#0055C3] w-full">
        <div className="p-12 flex space-x-16">
          <div className="w-1/2 bg-white  rounded-3xl p-6 ">
            <div className="border-b-2 ">
              <span className="text-lg font-semibold text-black">
                Thông tin cá nhân
              </span>
              <div className="flex p-4 ">
                <img
                  className="w-20 h-20"
                  src="/images/Frame 38.png"
                  alt="Profile"
                />
                <div className="p-4 ">
                  <span className="text-black">
                    A Nguyễn (nguyena123456789@gmail.com)
                  </span>
                  <div>
                    <button>Log out</button>
                  </div>
                </div>
              </div>
              <div className="p-4 space-x-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="rounded-sm"
                ></input>
                <span>Nhận email và cấc sản phẩm và ưu đãi mới</span>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b-2 ">
              <span className="text-lg font-semibold text-black">
                Thông tin thanh toán
              </span>
              <div className="p-4 space-y-5">
                  <input
                    type="text"
                    {...register("name")}
                    disabled={!isDifferentAddress}
                    className={`w-full rounded-md border-[#dbdbcf] ${
                      !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                    }`}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      {...register("phone")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                    <input
                      type="text"
                      {...register("email")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="flex space-x-3">
                  
                    <select
                      {...register("city")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    >
                      {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}

                   
                    <select
                      {...register("district")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    >
                      {districts.map((district) => (
                        <option key={district.value} value={district.value}>
                          {district.label}
                        </option>
                      ))}
                    </select>
                    {errors.district && <p className="text-red-500">{errors.district.message}</p>}
                  </div>

                  <div className="flex space-x-3">
                
                    <select
                      {...register("ward")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    >
                      {wards.map((ward) => (
                        <option key={ward.value} value={ward.value}>
                          {ward.label}
                        </option>
                      ))}
                    </select>
                    {errors.ward && <p className="text-red-500">{errors.ward.message}</p>}

                    <input
                      type="text"
                      {...register("street")}
                      disabled={!isDifferentAddress}
                      className={`w-full rounded-md border-[#dbdbcf] ${
                        !isDifferentAddress ? "cursor-not-allowed bg-[#f9f8f7]" : ""
                      }`}
                    />
                    {errors.street && <p className="text-red-500">{errors.street.message}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" {...register("deliveryToDifferentAddress")} />
                    <span>Giao hàng đến địa chỉ khác</span>
                  </div>

              </div>
            </div>
            </form>
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
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="rounded-sm"
                  ></input>
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
              <button className=" w-56 border-2 rounded-md h-10 text-white bg-[#0055c3] font-semibold">
                Thanh Toán
              </button>
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="bg-white h-fit  rounded-3xl p-8 ">
              <div className="border-b-2 pb-7">
                
                <div className="flex">
                  <div className="w-1/3 bg-[#dbdbcf]">
                    <div className="w-32 h-64 ml-12  flex justify-between items-center">
                      <img
                        className="w-full"
                        src="/images/products/bottle-3.png"
                        alt="Product Collection"
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between ">
                        <div>
                          <p className="text-black">
                            Bình giữ nhiệt
                            <span className="font-semibold"> GRACEFUL</span>
                          </p>
                        </div>
                        <div className="flex space-x-4">
                          <p className="text-black">?VND</p>
                          <button>Sửa</button>
                          <button>Xóa</button>
                        </div>
                      </div>
                      <div>
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
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              <div className="flex space-x-3 justify-center pt-5 border-b-2 pb-5">
                <button className="w-56 h-10 border border-[#dbdbcf]   rounded-md bg-[#f9f8f7]">
                  Mã Ego Flask Voucher
                </button>
                <button className=" w-24 h-10 border border-[#dbdbcf]  rounded-md bg-[#f9f8f7]">
                  Áp dụng
                </button>
              </div>
              <div
                className="pt-5 flex justify-between border-b-2 pb-5
                "
              >
                <div className="text-black font-semibold">
                  <p>Tạm tính</p>
                  <p>Phí giao hàng</p>
                </div>

                <div className="text-black font-semibold">
                  <p>?VND</p>
                  <p>?VND</p>
                </div>
              </div>
              <div className="text-black font-semibold flex justify-between pt-5"
              >
                <p>Tổng thanh toán</p>
                <p>?VND</p>
              </div>
              
            </div>
            <button className="bg-[#0055C3] text-white pt-10 flex space-x-3 ">
                <div className="h-2 w-2 pt-1">
                  <img   src="/icons/back.png" alt="" className="w-full"/>   
                </div>
               
            <p>Quay lại giỏ hàng</p>
            </button>
            
          </div>
          
        </div>
      </div>
    </main>
  );
}

