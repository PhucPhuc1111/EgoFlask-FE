import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { message, Select } from "antd";
import { da } from "date-fns/locale";
import _ from "lodash";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";
import { updateProfile, useGetDistricts, useGetProfile, useGetProvinces, useGetWards } from "~/data";

let schema = object({
  address: string().required("Địa chỉ là bắt buộc"),
  provinces: string().required("Thành phố là bắt buộc"),
  districts: string().required("Quận là bắt buộc"),
  wards: string().required("Phường là bắt buộc"),
});
const resolver = yupResolver(schema);
type UpdateAddress = InferType<typeof schema>;

export default function ProfileUpdateAddress() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<UpdateAddress>({
    resolver,
    mode: "onChange",
  });
  const profile = useGetProfile();
  const provinces = useGetProvinces();
  const districts = useGetDistricts();
  const districtId = watch('districts');
  const wards = useGetWards(Number(districtId));
  const provinceId = watch('provinces');
  const navigate = useNavigate();
  const splitAddress = useMemo(() => {
    return _.split(profile.data?.detail.address || '', ', ')
  }, [profile.data?.detail.address]);

  const filterDistrictsByProviceId = useMemo(() => {
    return _(districts.data?.data)
      .filter(it => it.ProvinceID === Number(provinceId))
      .value()
  }, [watch('provinces'), districts.data?.data]);

  const mapProvinces = useMemo(() => {
    return _.mapKeys(provinces.data?.data, it => it.ProvinceID)
  }, [provinces.data?.data]);

  const mapDistricts = useMemo(() => {
    return _.mapKeys(districts.data?.data, it => it.DistrictID)
  }, [districts.data?.data]);

  const mapWards = useMemo(() => {
    return _.mapKeys(wards.data?.data, it => it.WardCode)
  }, [districts.data?.data, wards.data?.data]);

  const onSubmit = async (data: UpdateAddress) => {
    if (!data.districts || !data.provinces || !data.wards) {
      message.warning(`Vui lòng điền đầy đủ thông tin`)
    }
    console.log("data", data);
    const duration = 3000
    let formData = new FormData();
    formData.append("Name", profile.data?.detail?.name ||'');
    formData.append("AvatarPic",  profile.data?.detail?.avatar || '');
    formData.append("Gender", profile.data?.detail?.gender || "");
    formData.append("Dob", profile.data?.detail?.birthday || "");
    formData.append('Address', `${data.address}, ${mapWards[data.wards]?.WardName}, ${mapDistricts[data.districts]?.DistrictName}, ${mapProvinces[data.provinces]?.ProvinceName}`);
    formData.append("PhoneNumber", profile.data?.detail?.phoneNumber || "");

    try {
      let response = await updateProfile(profile.data?.user?.token || '', formData);
      if (response) {
        message.success("Cập nhật địa chỉ thành công, vui lòng đăng nhập lại", 3);
        setTimeout(() => {
          navigate('/logout?redirectTo=/login')
        }, duration)
      }
    } catch (error: any) {
      message.error(`Cập nhật thất bại: ${error?.message}`);
    }
  };

  return (
    <main className="mt-[--m-header-top]">
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full lg:space-x-7 lg:pr-8">
      <div className="lg:col-span-2 border-[#e8e8e4] border-2 rounded-r-3xl w-full mb-4 lg:mb-0">
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
                    placeholder="Số nhà, địa chỉ"
                    {...register("address")}
                    defaultValue={splitAddress[0]}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                  <div className="flex flex-col space-x-3">
                    <Select
                      options={_.map(provinces.data?.data, (item) => {
                        return {
                          label: item.ProvinceName,
                          value: item.ProvinceID
                        }
                      })}
                      onChange={(value) => {
                        setValue('provinces', value)
                      }}
                      placeholder={splitAddress[3] || "Chọn tỉnh, thành phố"}
                      loading={provinces.isLoading}
                      className="w-full rounded-md border-[#dbdbcf]"
                    >
                    </Select>
                    {errors.provinces && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.provinces.message}
                      </p>
                    )}

                  </div>

                  <div className="flex flex-col space-x-3">
                    <Select
                      options={_.map(filterDistrictsByProviceId, (item) => {
                        return {
                          label: item.DistrictName,
                          value: item.DistrictID
                        }
                      })}
                      loading={districts.isLoading}
                      onChange={(value) => {
                        setValue('districts', value)
                      }}
                      disabled={!watch('provinces')}
                      className="w-full rounded-md border-[#dbdbcf]"
                      placeholder={splitAddress[2] || "Chọn quận, huyện"}
                    >
                    </Select>
                    {errors.districts && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.districts.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-x-3">
                    <Select
                      options={_.map(wards.data?.data, (item) => {
                        return {
                          label: item.WardName,
                          value: item.WardCode
                        }
                      })}
                      loading={wards.isLoading}
                      placeholder={splitAddress[1] || "Chọn phường, xã"}
                      onChange={(value) => {
                        setValue('wards', value)
                      }}
                      disabled={!watch('districts')}
                      className="w-full rounded-md border-[#dbdbcf]"
                    >
                    </Select>
                    {errors.wards && (
                      <p className="text-red-500 text-xs mt-1">
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
