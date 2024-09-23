import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ProfileSidebar, SubFooter } from "~/components";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return json({}, { status: 200 });
}

const Profile = () => {
  return (
    <main className="mt-[--m-header-top] ">
      <div className="grid grid-cols-12 w-full space-x-7 pr-8">
        <div className="col-span-2  border-[#e8e8e4] border-2 rounded-r-3xl w-full  ">
        <ProfileSidebar />
        </div>
        <div className="col-span-10 border-[#0055C3] my-9 border-2 rounded-3xl px-7  ">
          <div className="p-7">
            <p className="text-lg font-semibold text-[#0055C3] pt-4 mt-7">
              Hồ sơ của tôi
            </p>
            <div className="grid grid-cols-12 ">
              <div className="col-span-8 border-r-2 border-[#0055C3] w-full p-7 ">
                <div className="flex">
                  <div className="mt-4 space-y-6  font-semibold text-[#9c9797]">
                    <div className="">Họ và tên</div>
                    <div className="">Email</div>
                    <div className="">Số điện thoại</div>
                    <div className="">Giới tính</div>
                    <div className="">Ngày sinh</div>
                  </div>
                  <div className=" mt-4 ml-4 space-y-6   text-black">
                    <div className="flex space-x-9">
                      <span className="">Nguyễn Văn A </span>
                     
                    </div>
                    <div className="flex space-x-9">
                      <span>ng************9@gmail.com</span>
                      <Link
                        to="/profile/email"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex space-x-9">
                      <span>*********90</span>
                      <Link
                        to="/profile/phone-number"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>

                    
                    <div className="flex space-x-4">
                      <div className="flex items-center ">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="default-radio"
                          className=" cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2  dark:border-[#0055c3] dark:focus:ring-[#0055c3]"
                        />
                        <label htmlFor="default-radio-1" className="ml-2">
                          Nam
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
                          Nữ
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
                          Không muốn đề cập
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex space-x-9">
                      <span>**/10/20**</span>
                      <Link
                        to="/profile/dob"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 ">
                <div className="">
                  <div className="flex justify-center ">
                    <img className="h-32 w-32" src='/images/avatar.png' alt="" />
                  </div>

                  <div className="flex justify-center mt-4">
                    <button className="border-2 rounded-lg h-12 w-24">
                      Chọn ảnh
                    </button>
                  </div>

                  <div className=" text-center mt-4">
                    <p>Dung lượng file tối đa 1MB </p>{" "}
                    <p>Định dạng: .JPEG, .PNG</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div><SubFooter/></div>
    </main>
  );
};

export default Profile;
