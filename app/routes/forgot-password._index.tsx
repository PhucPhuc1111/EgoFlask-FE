import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { forgotPassword } from "~/data";

let loginSchema = object({
  email: string().trim().required("Username is a required field"),
})

type ResetData = InferType<typeof loginSchema>

const resolver = yupResolver(loginSchema)

export default function ForgotPassword() {
  const { handleSubmit, formState: { errors, isSubmitting }, register, setValue, setError } = useForm<ResetData>({
    mode: 'onSubmit',
    resolver,
  })
  const navigate = useNavigate();

  const onSubmit = async (data: ResetData) => {
    try {
      let response = await forgotPassword(data.email);
      console.log('response', response);

      if (response) {
        navigate(`/forgot-password-success?message=${response}`);
      }
    } catch (error: any) {
      console.log('error', error);
      if (error.status == 400) {
        setError('email', {
          message: 'Email not found'
        })
      }
    }
  }

  return (
    <main className="lg:mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <p className="text-center text-[#393334] text-base">
          Đặt lại mật khẩu
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="flex flex-col gap-5 w-[450px] max-[350px]:px-10"
          autoComplete="off"
        >
          <input
            type="text"
            {...register('email')}
            placeholder="Email"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
          />
          {errors.email && <span className="text-red-500 font-bold text-sm">{errors.email.message}</span>}
          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-10 h-10" />}
            <span>
              Nhận mã xác minh
            </span>
          </button>
        </form>
        <Link to={'/login'} className="text-[#0055C3] text-base uppercase font-semibold hover:no-underline">
          Đăng nhập
        </Link>
      </div>
    </main>
  )
}