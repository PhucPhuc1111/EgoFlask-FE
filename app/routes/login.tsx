import { yupResolver } from "@hookform/resolvers/yup"
import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, Link, useLocation, useNavigate } from "@remix-run/react"
import { useQueryClient } from "@tanstack/react-query"
import { FormEvent, useEffect } from "react"
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
  email: string().trim().required("Username is a required field"),
  password: string().trim().required("Password is a required field"),
  loginType: string().trim().required(),
})

export type LoginFormData = InferType<typeof loginSchema>

const resolver = yupResolver(loginSchema)

export default function Login() {
  const { handleSubmit, formState: { errors }, register, setValue, setError } = useRemixForm<LoginFormData>({
    mode: 'onSubmit',
    resolver,
  })
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (location.search == '?success') {
      queryClient.clear()
      navigate('/')
    }
  }, [location.search])

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <input
            type="password"
            {...register('password')}
            placeholder="Mật khẩu"
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0] transition duration-200 ease-in"
          />
          {errors.password && <span className="text-red-500 font-bold text-sm">{errors.password.message}</span>}
          <button
            type="submit"
            className="uppercase active:bg-blue-800 hover:bg-blue-700 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
            Đăng nhập
          </button>
        </Form>
        <Link to={'/forgot-password'} className="text-[#0055C3] text-base uppercase font-semibold hover:no-underline">
          Quên mật khẩu?
        </Link>
      </div>
    </main>
  )
}
