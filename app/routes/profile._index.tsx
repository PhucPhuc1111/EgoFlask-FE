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
import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ProfileSidebar, SubFooter } from "~/components";
import { useGetProfile, updateProfile } from "~/data";
import { GetProp, Image, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload/interface";
import { authenticator } from "~/services/auth.server";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloudUpload } from "react-icons/io5";
import { format } from "date-fns";

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  return json({}, { status: 200 });
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Profile = () => {
  const { data: profile } = useGetProfile();
  const [gender, setGender] = useState<string>(profile?.detail?.gender?.toLowerCase() || "");
  const [isEditingGender, setIsEditingGender] = useState(false);
  const queryClient = useQueryClient();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (profile?.detail?.gender) {
      setGender(profile.detail.gender.toLowerCase());
    }
  }, [profile]);

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("Name", profile?.detail?.name || "");


    if (fileList[0].originFileObj) {
      formData.append("AvatarPic", fileList[0].originFileObj);
    } else {
      formData.append("AvatarPic", profile?.detail?.avatar || "");
    }

    formData.append("Gender", gender);
    formData.append("Dob", profile?.detail?.birthday || "");
    formData.append("PhoneNumber", profile?.detail?.phoneNumber || "");
    formData.append("Address", profile?.detail?.address || "");

    try {
      let response = await updateProfile(profile?.user?.token || "", formData);
      if (response) {
        message.success("Cập nhật thành công", 3);
        queryClient.invalidateQueries({
          queryKey: ['profile']
        })
      }
      setIsLoading(false);
    } catch (error: any) {
      message.error(`Cập nhật thất bại: ${error?.message}`);
      setIsLoading(false);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadProps: UploadProps = {
    accept: '.jpg, .png',
    listType: 'picture-circle',
    onRemove: (file) => {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    beforeUpload: (file) => {
      const isJpg = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      console.log(file);

      if (!isJpg && !isPng) {
        message.error('Bạn chỉ được upload file PNG hoặc JPG!');
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 20MB!');
        return Upload.LIST_IGNORE;
      }
      setFileList((prev) => [...prev, file]);
      return false; // Prevent automatic upload
    },
    fileList,
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList);
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onPreview: handlePreview,
  };

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
                      <span>{profile?.detail?.name}</span>
                      <Link
                        to="/profile/name"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Email</span>
                      <span>{profile?.detail?.email || ""}</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Số điện thoại</span>
                      <span>{profile?.detail?.phoneNumber}</span>
                      <Link
                        to="/profile/phone-number"
                        className="text-[#0055c3] underline"
                      >
                        Thay đổi
                      </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Giới tính</span>
                      {isEditingGender ? (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              id="male"
                              type="radio"
                              name="gender"
                              checked={gender === "male"}
                              onChange={() => handleGenderChange("male")}
                              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                            />
                            <label htmlFor="male" className="ml-2">
                              Nam
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="female"
                              type="radio"
                              name="gender"
                              checked={gender === "female"}
                              onChange={() => handleGenderChange("female")}
                              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                            />
                            <label htmlFor="female" className="ml-2">
                              Nữ
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="not-specified"
                              type="radio"
                              name="gender"
                              checked={gender === ""}
                              onChange={() => handleGenderChange("")}
                              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-[#0055c3] focus:ring-[#0055c3] focus:ring-2"
                            />
                            <label htmlFor="not-specified" className="ml-2">
                              Không muốn đề cập
                            </label>
                          </div>
                          <button
                            onClick={handleSaveProfile}
                            className="ml-4 text-white bg-[#0055c3] px-4 py-1 rounded-md"
                          >
                            Lưu
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <span>
                            {gender === "male"
                              ? "Nam"
                              : gender === "female"
                                ? "Nữ"
                                : "Không muốn đề cập"}
                          </span>
                          <button
                            onClick={() => setIsEditingGender(true)}
                            className="text-[#0055c3] underline"
                          >
                            Thay đổi
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <span className="text-[#9c9797]">Ngày sinh</span>
                      <span>{format(profile?.detail?.birthday || new Date('2000-01-01'), 'dd/MM/yyyy')}</span>
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
                        {profile?.detail?.address}
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
                  <Upload
                    {...uploadProps}
                  >
                    {fileList.length > 0 ? null : (
                      <div className="flex flex-col items-center justify-center">
                        <IoCloudUpload />
                        <span className="text-xs">Upload</span>
                      </div>
                    )}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                  {fileList.length > 0 && (
                    <button
                      onClick={handleSaveProfile}
                      className="border-2 rounded-lg h-auto w-auto mt-4 p-2 text-sm lg:text-base bg-[#0055c3] text-white"
                    >
                      {isLoading ? <img src="/icons/loading.svg" alt="loading" className="w-7 h-7" /> : <span>Thay đổi ảnh</span>}
                    </button>
                  )}
                  <div className="text-center mt-4 text-sm lg:text-base">
                    <p>Dung lượng file tối đa 20MB</p>
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
