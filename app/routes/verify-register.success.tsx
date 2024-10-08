import { Link, useLocation } from "@remix-run/react";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function VerifyRegisterSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  return (
    <main className="lg:mt-[--m-header-top] xl:px-[500px] pb-[--m-footer-bottom]">
      <div className="w-full flex flex-col items-center justify-center gap-9 pt-20 mx-auto">
        <IoCheckmarkCircle className="w-20 h-20 text-green-500" />
        <p className="text-center text-[#393334] text-base">
          {message}
        </p>
        <Link to="/login" className="text-[#0055C3] font-semibold">
          Quay lại đăng nhập
        </Link>
      </div>
    </main>
  )
}