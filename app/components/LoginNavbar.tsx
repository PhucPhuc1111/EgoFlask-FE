import { NavLink } from "@remix-run/react"

export const LoginNavbar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-1">
        <h4 className="uppercase text-xl leading-6">
          CHÀO BẠN!
        </h4>
        <h4 className="uppercase text-xl leading-6">
          BẠN ĐÃ CÓ TÀI KHOẢN CHƯA?
        </h4>
      </div>
      <div className="flex flex-1">
        <NavLink to='/register'
          className={({ isActive }) =>
            `${isActive ? 'bg-[#0055C3] text-white hover:text-white' : 'text-[#0055C3]'} hover:no-underline flex items-center justify-center border-b-[1px] border-t-[1px] border-l-[1px] border-[#0055C3] px-3 py-4 rounded-l-md uppercase h-14`}
        >
          KHÔNG, TÔI LÀ NGƯỜI MỚI
        </NavLink>
        <NavLink to='/login'
          className={({ isActive }) =>
            `${isActive ? 'bg-[#0055C3] text-white hover:text-white' : 'text-[#0055C3]'} hover:no-underline flex items-center justify-center border-b-[1px] border-t-[1px] border-l-[1px] border-[#0055C3] px-3 py-4 rounded-r-md uppercase h-14`}
        >
          TÔI ĐÃ CÓ TÀI KHOẢN
        </NavLink>
      </div>
    </>
  )
}