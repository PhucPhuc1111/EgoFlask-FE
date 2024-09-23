import { yupResolver } from "@hookform/resolvers/yup";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { InferType, object, ref, string } from "yup";
import { forgotPasswordReset } from "~/data";

export function loader({ params, request }: LoaderFunctionArgs) {
  let slug = params.slug;
  let url = new URL(request.url);
  let email = url.searchParams.get('email');
  return json({ slug, email }, { status: 200 });
}

let loginSchema = object({
  email: string().trim().required("Email is a required field"),
  password: string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(25, "Mật khẩu không được quá 25 ký tự")
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ in hoa')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')
    .required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'Mật khẩu xác nhận không khớp')
    .required(),
})

export type ForgotPasswordForm = InferType<typeof loginSchema>

const resolver = yupResolver(loginSchema)

export default function ForgotPasswordSlug() {
  const { handleSubmit, formState: { errors, isSubmitting }, register, setValue, setError } = useForm<ForgotPasswordForm>({
    mode: 'onChange',
    resolver,
  })
  const navigate = useNavigate();
  const { email, slug } = useLoaderData<typeof loader>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  if (email) setValue('email', email);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      let response = await forgotPasswordReset(data, slug || '');
      if (response) {
        navigate(`/forgot-password-success?message=${response}`);
      }
    } catch (error: any) {
      if (error.status == 400) {
        setError('confirmPassword', {
          message: error.response.data
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
          className="flex flex-col gap-8 w-[450px] max-[350px]:px-10">
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              required
              className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
              {...register('password')}
            />
            {showPassword ? (
              <IoEyeOff onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            ) : (
              <IoEye onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            )}
          </div>
          {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu"
              required
              className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
              {...register('confirmPassword')}
            />
            {showConfirmPassword ? (
              <IoEyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            ) : (
              <IoEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            )}
          </div>
          {errors.confirmPassword && <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>}
          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-10 h-10" />}
            <span>
              Đổi mật khẩu
            </span>
          </button>
        </form>
        <Link to={'/login'} className="text-[#0055C3] text-base uppercase font-semibold hover:no-underline">
          Quay lại đăng nhập
        </Link>
      </div>
    </main>
  )
}