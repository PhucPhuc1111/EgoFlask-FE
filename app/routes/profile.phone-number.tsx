// import { yupResolver } from "@hookform/resolvers/yup";
// import { Link } from "@remix-run/react";
// import { useForm } from "react-hook-form";

// import { InferType, number, object } from "yup";
// import { ProfileSidebar, SubFooter } from "~/components";

// let schema = object({
//   phone: number().required("Số điện thoại là bắt buộc"),
// });

// const resolver = yupResolver(schema);
// type UpdatePhoneForm = InferType<typeof schema>;

// export default function ProfileUpdatePhoneNumber() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<UpdatePhoneForm>({
//     resolver,
//     mode: "onChange",
//   });

//   const onSubmit = (data: UpdatePhoneForm) => {
//     console.log("data", data);
//   };

//   return (
//     <main className="mt-[--m-header-top]">
//       <div className="grid grid-cols-12 w-full space-x-7 pr-8">
//         <div className="col-span-2 border-[#e8e8e4] border-2 rounded-r-2xl w-full">
//           <ProfileSidebar />
//         </div>
//         <div className="col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-7">
//           <div className="p-7 w-1/2">
//             <p className="text-lg font-semibold text-[#0055C3] pt-4 mt-7">
//               Thay đổi số điện thoại
//             </p>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               method="post"
//               className="mt-4 ml-4 space-y-6 text-black"
//             >
//               <div className="flex space-x-5 p-7">
//                 <div className="mt-2 space-y-6 font-semibold text-[#9c9797]">
//                   Số điện thoại mới
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="**********87"
//                     {...register("phone")}
//                   />
                  
//                 </div>
//               </div>
//               <div className="flex justify-center">
//               <Link to="/verify/phone">
//                 <button
//                   type="submit"
//                   className="h-12 w-auto px-4 border text-white bg-[#0055c3]"
//                 >
//                   Gửi mã OTP
//                 </button></Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div>
//         <SubFooter />
//       </div>
//     </main>
//   );
// }
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "@remix-run/react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";
import { updateProfile, useGetProfile } from "~/data"; 

let schema = object({
  phone: string().required("Số điện thoại là bắt buộc"),
});

const resolver = yupResolver(schema);
type UpdatePhoneForm = InferType<typeof schema>;

export default function ProfileUpdatePhoneNumber() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdatePhoneForm>({
    resolver,
    mode: "onChange",
  });

  const profile = useGetProfile(); 
  const navigate = useNavigate();

  const onSubmit = async (data: UpdatePhoneForm) => {
    let formData = new FormData();
    formData.append("Name", profile.data?.detail?.name ||'');
    formData.append("AvatarPic", '');
    formData.append("Gender", profile.data?.detail?.gender || ""); 
    formData.append("Dob", profile.data?.detail?.birthday || ""); 
    formData.append("Address", profile.data?.detail?.address || ""); 

  formData.append("PhoneNumber", data.phone); 

    try {
      let response = await updateProfile(profile.data?.user?.token || '', formData);
      if (response) {
        message.success("Cập nhật số điện thoại thành công, vui lòng đăng nhập lại", 3);
        setTimeout(() => {
          navigate('/logout?redirectTo=/login'); 
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
              Thay đổi số điện thoại
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="mt-4 ml-4 space-y-6 text-black"
              >
                  <div className="flex space-x-5 p-7">
                  <div className="mt-2 space-y-6 font-semibold text-[#9c9797]">
                  Số điện thoại mới
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                   className="w-full rounded-md"
                    {...register("phone")}
                    placeholder="Nhập số điện thoại mới"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
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
