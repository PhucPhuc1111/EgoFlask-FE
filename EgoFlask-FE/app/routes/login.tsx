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

export default function Login() {
  return (
    <main className="flex items-center justify-center h-96 max-h-screen mt-[--m-header-top]">
      <div className="w-full flex flex-col items-center justify-center gap-4">
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
                `${isActive ? 'bg-[#0055C3] text-white' : 'text-[#0055C3]'} flex items-center justify-center border-[1px] border-[#0055C3] px-3 py-4 rounded-md uppercase h-14`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </main>
  )
}