import { NavLink } from "@remix-run/react"
import _ from "lodash"
import { LoginNavbar } from "~/components"

export default function Login() {
  return (
    <main className="mt-[--m-header-top]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-52 px-36 mx-auto">
        <LoginNavbar />
        <p className="text-center text-[#393334] text-base">
          Bạn đã trải nghiệm dịch vụ của Ego Flask? Tuyệt vời! <br />
          Chỉ cần dùng email mà bạn đã sử dụng để đăng ký trước đây nhé !
        </p>
        <input type="text" placeholder="Email" />
      </div>
    </main>
  )
}