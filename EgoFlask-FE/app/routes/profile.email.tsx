import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { ProfileSidebar, SubFooter } from "~/components";

let schema = object({
  email: string().email().required("Email là bắt buộc"),
});
const resolver = yupResolver(schema);
type UpdateEmailForm = InferType<typeof schema>;

export default function ProfileUpdateEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateEmailForm>({
    resolver,
    mode: "onChange",
  });
  const onSubmit = (data: UpdateEmailForm) => {
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
              Thay đổi địa chỉ email
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="mt-4 ml-4 space-y-6 text-black"
            >
              <div className="flex space-x-5 p-7">
                <div className="mt-2 space-y-6 font-semibold text-[#9c9797]">
                 Thay đổi địa chỉ email mới
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="afagfh@gmail.com"
                    {...register("email")}
                  />
                  
                </div>
              </div>
              <div className="flex justify-center">
              <Link to="/verify/email">
                <button
                  type="submit"
                  className="h-12 w-auto px-4 border text-white bg-[#0055c3]"
                >
                  Gửi mã xác minh
                </button>
                </Link>
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
