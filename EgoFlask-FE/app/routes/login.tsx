import { ActionFunctionArgs, json } from "@remix-run/node"
import { Form, Link } from "@remix-run/react"
import { LoginNavbar } from "~/components"
import { authenticator } from "~/services/auth.server"

export function action({ request }: ActionFunctionArgs) {
  return json({}, { status: 200 })
}

export default function Login() {
  return (
    <main className="lg:mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <LoginNavbar />
        <p className="text-center text-[#393334] text-base">
          Bạn đã trải nghiệm dịch vụ của Ego Flask? Tuyệt vời! <br />
          Dùng email mà bạn đã sử dụng để đăng ký trước đây nhé!
        </p>
        <Form
          method="post"
          className="flex flex-col gap-5 w-[450px] max-[350px]:px-10">
          <input 
            type="text" 
            placeholder="Email" 
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" 
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            className="w-[450px] focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" 
          />
          <button 
            type="submit" 
            className="uppercase active:bg-blue-800 bg-[#0055C3] w-[450px] py-4 rounded-lg text-white font-semibold text-xl">
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
