import { yupResolver } from "@hookform/resolvers/yup"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useLocation, useNavigate } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { FormEvent, useEffect, useState } from "react"
import { IoEye, IoEyeOff, IoLogoGoogle } from "react-icons/io5"
import { AuthorizationError } from "remix-auth"
import { useRemixForm } from "remix-hook-form"
import { InferType, object, string } from "yup"
import { LoginNavbar } from "~/components"
import { authenticator } from "~/services/auth.server"

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate('user-pass', request, {
      successRedirect: '/login?success',
      throwOnError: true,
    })
  } catch (error: any) {
    let cause = (error.cause?.cause) as any
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      console.log('error login', cause?.message);

      return json({ errors: { password: { message: cause?.message } } })
    }
    return json({ errors: { password: { message: error.message } } })
  }
}

let loginSchema = object({
  email: string().trim().required("Email is a required field"),
  password: string().trim().required("Password is a required field"),
  loginType: string().trim().required(),
  verifyUrl: string().trim(),
})

export type LoginFormData = InferType<typeof loginSchema>

const resolver = yupResolver(loginSchema)

export default function Login() {
  const { handleSubmit, formState: { errors, isSubmitting }, register, setValue, setError } = useRemixForm<LoginFormData>({
    mode: 'onSubmit',
    resolver,
  })
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (location.search == '?success') {
      queryClient.clear()
      navigate('/')
    }
  }, [location.search])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue('verifyUrl', `${window.location.origin}/verify-register/{token}`)
    handleSubmit(e)
  }
  return (
    <main className="lg:mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <LoginNavbar />
        <p className="text-center text-[#393334] text-base">
          Bạn đã trải nghiệm dịch vụ của Ego Flask? Tuyệt vời! <br />
          Dùng email mà bạn đã sử dụng để đăng ký trước đây nhé!
        </p>
        <Form
          onSubmit={submit}
          reloadDocument
          method="post"
          className="flex flex-col gap-5 w-[450px] max-[350px]:px-10">
          <input type="text" hidden value={'user-pass'} {...register('loginType')} />
          <input
            type="text"
            {...register('email')}
            placeholder="Email"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Mật khẩu"
              className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
            />
            {showPassword ? (
              <IoEyeOff onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            ) : (
              <IoEye onClick={() => setShowPassword(!showPassword)} className='transition-opacity duration-300 ease-in-out opacity-100 absolute right-3 top-0 mt-3 cursor-pointer size-6 text-[#465166] hover:text-black' />
            )}
          </div>
          {errors.password && <span className="text-red-500 font-bold text-sm">{errors.password.message}</span>}
          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center uppercase active:bg-blue-800 hover:bg-blue-900 disabled:bg-blue-900 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            {isSubmitting && <img src="/icons/loading.svg" alt="" className="w-10 h-10" />}
            <span>
              Đăng nhập
            </span>
          </button>
        </Form>
        <p className="text-[#393334] text-base">
          Hoặc đăng nhập bằng
        </p>
        <Link to={'/google'} className="bg-red-500 text-white hover:no-underline hover:text-white hover:bg-red-600 flex items-center justify-center gap-2 p-4 rounded-md">
          <IoLogoGoogle />
          <span>
            Đăng nhập bằng Google
          </span>
        </Link>
        <Link to={'/forgot-password'} className="text-[#0055C3] text-base uppercase font-semibold hover:no-underline">
          Quên mật khẩu?
        </Link>
      </div>
    </main>
  )
}
