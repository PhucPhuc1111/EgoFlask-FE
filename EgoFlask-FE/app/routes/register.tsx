import { LoginNavbar } from "~/components";

export default function Register() {
  return (
    <main className="mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-52 mx-auto">
        <LoginNavbar />
        <form
          method="post"
          className="flex flex-col gap-8 w-full max-[350px]:px-10 lg:px-36 px-24">
          <input type="text" placeholder="Họ" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <input type="text" placeholder="Tên" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <input type="email" placeholder="Email" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <input type="tel" placeholder="Số điện thoại" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <input type="password" placeholder="Mật khẩu" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <input type="password" placeholder="Xác nhận mật khẩu" className="w-full focus:ring-0 border-0 border-b-2 border-[#E6E6E0]" />
          <button type="submit" className="uppercase active:bg-blue-800 bg-[#0055C3] w-full py-4 rounded-lg text-white font-semibold text-xl">
            Tạo tài khoản
          </button>
        </form>
      </div>
    </main>
  )
}