import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@remix-run/react";
import { message, DatePicker } from "antd"; 
import { useForm } from "react-hook-form";
import { InferType, object } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";
import { updateProfile, useGetProfile } from "~/data";
import moment from "moment"; 
import { useState } from "react"; 

let schema = object({});

const resolver = yupResolver(schema);

type UpdateDobForm = InferType<typeof schema>;

export default function ProfileUpdateDob() {
  const {
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateDobForm>({
    resolver,
    mode: "onChange",
  });

  const profile = useGetProfile();
  const navigate = useNavigate();


  const [dob, setDob] = useState(profile.data?.detail?.birthday ? moment(profile.data.detail.birthday) : null);

  const onDobChange = (date: any, dateString: string) => {
    setDob(dateString);
  };

  const onSubmit = async () => {
    let formData = new FormData();
    formData.append("Name", profile.data?.detail?.name || "");
    formData.append("AvatarPic", "");
    formData.append("Gender", profile.data?.detail?.gender || "");
    formData.append("Dob", dob || ""); 
    formData.append("PhoneNumber", profile.data?.detail?.phoneNumber || "");
    formData.append("Address", profile.data?.detail?.address || "");

    try {
      let response = await updateProfile(profile.data?.user?.token || "", formData);
      if (response) {
        message.success("Cập nhật ngày sinh thành công, vui lòng đăng nhập lại", 3);
        setTimeout(() => {
          navigate("/logout?redirectTo=/login");
        }, 3000);
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
              Thay đổi ngày sinh
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="mt-4 ml-4 space-y-6 text-black"
              >
                <div className="flex space-x-5 p-7">
                  <div className="mt-2 space-y-6 font-semibold text-[#9c9797]">
                  Ngày sinh mới
                </div>
                <div className="flex flex-col gap-2">
                  <DatePicker
                    defaultValue={dob ? moment(dob) : null} 
                    onChange={onDobChange} 
                    format="YYYY-MM-DD"
                    className="w-full rounded-md"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dob.message}
                    </p>
                  )}
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
