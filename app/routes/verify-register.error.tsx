import { Link, useLocation } from "@remix-run/react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

export default function VerifyRegisterError() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  return (
    <main className="lg:mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <IoCloseCircle className="w-20 h-20 text-red-500" />
        <p className="text-center text-[#393334] text-base">
          {message}
        </p>
        <Link to={`/login?message=${encodeURIComponent('Đăng nhập bằng tài khoản mật khẩu đã đăng ký để nhận mail xác thực')}&type=error&duration=5`} className="text-[#0055C3] font-semibold">
          Gửi lại mã xác thực
        </Link>
      </div>
    </main>
  )
}