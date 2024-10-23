// import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
// import { Link } from "@remix-run/react";
// import { useMemo } from "react";
// import { ProfileSidebar, SubFooter } from "~/components";
// import { useGetProfile } from "~/data";
// import { authenticator } from "~/services/auth.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   let user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     return redirect("/login");
//   }
//   return json({}, { status: 200 });
// }

// const Profile = () => {
//   const profile = useGetProfile();

//   const gender = useMemo(() => {
//     return profile.data?.detail?.gender?.toLowerCase();
//   }, [profile.data]);

//   return (
//     <main className="mt-[--m-header-top] ">
//       <div className="grid grid-cols-12 w-full space-x-7 pr-8">
//         <div className="col-span-2  border-[#e8e8e4] border-2 rounded-r-3xl w-full  ">
//           <ProfileSidebar />
//         </div>
//         <div className="col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-7  ">
//           <div className="p-7">
//             <p className="text-lg font-semibold text-[#0055C3] pt-4 mt-7">
//               Hồ sơ của tôi
//             </p>
//             <div className="grid grid-cols-12 ">
//               <div className="col-span-8 border-r-2 border-[#0055C3] w-full p-7 ">
//                 <div className="flex flex-col">
//                   <div className="mt-4 space-y-6  font-semibold">
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Họ và tên</span>
//                       <span className="">{[profile.data?.detail.name]}</span>
//                     </div>
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Email</span>
//                       <span>{profile.data?.detail.email || ""}</span>
//                       <Link
//                         to="/profile/email"
//                         className="text-[#0055c3] underline"
//                       >
//                         Thay đổi
//                       </Link>
//                     </div>
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Số điện thoại</span>
//                       <span>{profile.data?.detail.phoneNumber}</span>
//                       <Link
//                         to="/profile/phone-number"
//                         className="text-[#0055c3] underline"
//                       >
//                         Thay đổi
//                       </Link>
//                     </div>
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Giới tính</span>
//                       <div className="flex items-center ">
//                         <input
//                           id="default-radio-1"
//                           type="radio"
//                           value=""
//                           name="default-radio"
//                           checked={gender === "male"}
//                           className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
//                         />
//                         <label htmlFor="default-radio-1" className="ml-2">
//                           Nam
//                         </label>
//                       </div>
//                       <div className="flex items-center">
//                         <input
//                           id="default-radio-2"
//                           type="radio"
//                           value=""
//                           name="default-radio"
//                           checked={gender === "female"}
//                           className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
//                         />
//                         <label htmlFor="default-radio-2" className="ml-2">
//                           Nữ
//                         </label>
//                       </div>
//                       <div className="flex items-center">
//                         <input
//                           checked={!gender}
//                           id="default-radio-2"
//                           type="radio"
//                           value=""
//                           name="default-radio"
//                           className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
//                         />
//                         <label htmlFor="default-radio-2" className="ml-2">
//                           Không muốn đề cập
//                         </label>
//                       </div>
//                     </div>
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Ngày sinh</span>
//                       <span>{profile.data?.detail.birthday}</span>
//                       <Link
//                         to="/profile/dob"
//                         className="text-[#0055c3] underline"
//                       >
//                         Thay đổi
//                       </Link>
//                     </div>
//                     <div className="flex justify-start gap-10">
//                       <span className="text-[#9c9797]">Địa chỉ</span>
//                       <span className="line-clamp-2">{profile.data?.detail.address}</span>
//                       <Link
//                         to="/profile/address"
//                         className="text-[#0055c3] underline"
//                       >
//                         Thay đổi
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-span-4 ">
//                 <div className="">
//                   <div className="flex justify-center ">
//                     <img className="w-32 h-32 rounded-full" src={profile.data?.user?.avatar?.[0].value || '/images/avatar.png'} alt="Profile" />
//                   </div>

//                   <div className="flex justify-center mt-4">
//                     <button className="border-2 rounded-lg h-12 w-24">
//                       Chọn ảnh
//                     </button>
//                   </div>

//                   <div className=" text-center mt-4">
//                     <p>Dung lượng file tối đa 1MB </p>{" "}
//                     <p>Định dạng: .JPEG, .PNG</p>{" "}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div><SubFooter /></div>
//     </main>
//   );
// };

// export default Profile;
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useMemo } from "react";
import { ProfileSidebar, SubFooter } from "~/components";
import { useGetProfile } from "~/data";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return json({}, { status: 200 });
}

const Profile = () => {
  const profile = useGetProfile();

  const gender = useMemo(() => {
    return profile.data?.detail?.gender?.toLowerCase();
  }, [profile.data]);

  return (
    <main className="mt-[--m-header-top]">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full lg:space-x-7 lg:pr-8">
        <div className="lg:col-span-2 border-[#e8e8e4] border-2 rounded-r-3xl w-full mb-4 lg:mb-0">
          <ProfileSidebar />
        </div>
        <div className="lg:col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-4 lg:px-7">
          <div className="p-4 lg:p-7">
            <p className="text-base lg:text-lg font-semibold text-[#0055C3] pt-4 mt-7">
              Hồ sơ của tôi
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 border-r-0 lg:border-r-2 border-[#0055C3] w-full p-4 lg:p-7">
                <div className="flex flex-col">
                  <div className="mt-4 space-y-6 font-semibold text-sm lg:text-base">
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Họ và tên</span>
                      <span>{[profile.data?.detail.name]}</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Email</span>
                      <span>{profile.data?.detail.email || ""}</span>
                      <Link
                        to="/profile/email"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Số điện thoại</span>
                      <span>{profile.data?.detail.phoneNumber}</span>
                      <Link
                        to="/profile/phone-number"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Giới tính</span>
                      <div className="flex items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="default-radio"
                          checked={gender === "male"}
                          className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                        />
                        <label htmlFor="default-radio-1" className="ml-2">
                          Nam
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          checked={gender === "female"}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                        />
                        <label htmlFor="default-radio-2" className="ml-2">
                          Nữ
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          checked={!gender}
                          id="default-radio-3"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                        />
                        <label htmlFor="default-radio-3" className="ml-2">
                          Không muốn đề cập
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Ngày sinh</span>
                      <span>{profile.data?.detail.birthday}</span>
                      <Link
                        to="/profile/dob"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Địa chỉ</span>
                      <span className="line-clamp-2">
                        {profile.data?.detail.address}
                      </span>
                      <Link
                        to="/profile/address"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="flex flex-col items-center">
                  <img
                    className="w-32 h-32 rounded-full"
                    src={
                      profile.data?.user?.avatar?.[0].value || "/images/avatar.png"
                    }
                    alt="Profile"
                  />
                  <button className="border-2 rounded-lg h-12 w-24 mt-4 text-sm lg:text-base">
                    Chọn ảnh
                  </button>
                  <div className="text-center mt-4 text-sm lg:text-base">
                    <p>Dung lượng file tối đa 1MB</p>
                    <p>Định dạng: .JPEG, .PNG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SubFooter />
      </div>
    </main>
  );
};

export default Profile;

