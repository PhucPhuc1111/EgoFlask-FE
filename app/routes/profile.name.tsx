import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@remix-run/react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";
import { updateProfile, useGetProfile } from "~/data"; 

let schema = object({
  name: string().required("Tên là bắt buộc"),
});

const resolver = yupResolver(schema);
type UpdateNameForm = InferType<typeof schema>;

export default function ProfileUpdateName() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateNameForm>({
    resolver,
    mode: "onChange",
  });

  const profile = useGetProfile(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSubmit = async (data: UpdateNameForm) => {
    let formData = new FormData();
    formData.append("Name", data.name); 
    formData.append("AvatarPic",  profile.data?.detail?.avatar || '');
    formData.append("Gender", profile.data?.detail?.gender || "");
    formData.append("Dob", profile.data?.detail?.birthday || "");
    formData.append("PhoneNumber", profile.data?.detail?.phoneNumber || "");
    formData.append("Address", profile.data?.detail?.address || "");
    

    try {
      let response = await updateProfile(profile.data?.user?.token || '', formData);
      if (response) {
        message.success("Cập nhật tên thành công", 3);
        queryClient.invalidateQueries({
          queryKey: ['profile']
        })
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
              Thay đổi tên
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="mt-4 ml-4 space-y-6 text-black"
            >
                 <div className="flex space-x-5 p-7">
                <div className="font-semibold text-[#9c9797]">
                  Tên mới
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full rounded-md "
                    {...register("name")}
                    placeholder="Nhập tên mới"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center ">
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
