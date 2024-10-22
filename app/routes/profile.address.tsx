import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@remix-run/react";
import _ from "lodash";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";
import { useGetDistricts, useGetProvinces, useGetWards } from "~/data";

let schema = object({
  address: string().required("Địa chỉ là bắt buộc"),
  provinces: string().required("Thành phố là bắt buộc"),
  districts: string().required("Quận là bắt buộc"),
  wards: string().required("Phường là bắt buộc"),
});
const resolver = yupResolver(schema);
type UpdateAddress = InferType<typeof schema>;

export default function ProfileUpdateEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UpdateAddress>({
    resolver,
    mode: "onChange",
  });

  const provinces = useGetProvinces();
  const districts = useGetDistricts();
  const districtId = watch('districts');
  const wards = useGetWards(Number(districtId));
  const provinceId = watch('provinces');

  const filterDistrictsByProviceId = useMemo(() => {
    return _(districts.data?.data)
      .filter(it => it.ProvinceID === Number(provinceId))
      .value()
  }, [watch('provinces'), districts.data?.data]);


  const onSubmit = (data: UpdateAddress) => {
    console.log("data", data);
  };
  return (
    <main className="mt-[--m-header-top] ">
      <div className="grid grid-cols-12 w-full space-x-7 pr-8">
        <div className="col-span-2  border-[#e8e8e4] border-2 rounded-r-2xl w-full  ">
          <ProfileSidebar />
        </div>
        <div className="col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-7  ">
          <div className="p-7 ">
            <p className="text-lg font-semibold text-[#0055C3] pt-4 mt-7">
              Thay đổi địa chỉ
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="mt-4 ml-4 space-y-6 text-black"
            >
              <div className="flex space-x-5 p-7">
                <div className="mt-2 space-y-6 font-semibold text-[#9c9797]">
                  Thay đổi địa chỉ mới
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    className="w-full rounded-md"
                    type="text"
                    placeholder="123 Đường 3/2"
                    {...register("address")}
                  />
                  <div className="flex flex-col space-x-3">
                    <select
                      {...register("provinces")}
                      className="w-full rounded-md border-[#dbdbcf]"
                    >
                      <option value="">Chọn thành phố</option>
                      {_.map(provinces.data?.data, (province, index) => (
                        <option key={index} value={province.ProvinceID}>{province.ProvinceName}</option>
                      ))}
                    </select>
                    {errors.provinces && (
                      <p className="text-red-500">
                        {errors.provinces.message}
                      </p>
                    )}

                  </div>

                  <div className="flex flex-col space-x-3">
                  <select
                      {...register("districts")}
                      disabled={!watch('provinces')}
                      className="w-full rounded-md border-[#dbdbcf]"
                    >
                      <option value="">Chọn quận</option>
                      {_.map(filterDistrictsByProviceId, (district, index) => (
                        <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
                      ))}
                    </select>
                    {errors.districts && (
                      <p className="text-red-500">
                        {errors.districts.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-x-3">
                    <select
                      {...register("wards")}
                      disabled={!watch('districts')}
                      className="w-full rounded-md border-[#dbdbcf]"
                    >
                      <option value="">Chọn phường</option>
                      {_.map(wards.data?.data, (ward, index) => (
                        <option key={index} value={ward.WardCode}>{ward.WardName}</option>
                      ))}
                    </select>
                    {errors.wards && (
                      <p className="text-red-500">
                        {errors.wards.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="h-12 w-auto px-4 border text-white bg-[#0055c3]"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
}
