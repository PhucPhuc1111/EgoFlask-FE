import { NavLink } from "@remix-run/react"
import _ from "lodash"

const links = [
  {
    'to': '/register',
    'label': 'KHÔNG, TÔI LÀ NGƯỜI MỚI'
  },
  {
    'to': '/login',
    'label': 'TÔI ĐÃ CÓ TÀI KHOẢN'
  },
]

export const LoginNavbar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h4 className="uppercase text-xl leading-6">
          CHÀO BẠN!
        </h4>
        <h4 className="uppercase text-xl leading-6">
          BẠN ĐÃ CÓ TÀI KHOẢN CHƯA ?
        </h4>
      </div>
      <div className="flex flex-1">
        {_.map(links, (link, index) => (
          <NavLink key={index} to={link.to}
            className={({ isActive }) =>
              `${isActive ? 'bg-[#0055C3] text-white hover:text-white' : 'text-[#0055C3]'} hover:no-underline flex items-center justify-center border-[1px] border-[#0055C3] px-3 py-4 rounded-md uppercase h-14`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}