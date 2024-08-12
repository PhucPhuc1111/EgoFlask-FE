import { IoCartOutline, IoPersonOutline, IoSearch } from "react-icons/io5";
import { NavLink, useNavigate } from "@remix-run/react";
import _ from "lodash";

export const Header = () => {
  const navigate = useNavigate();

  const navBar = [
    {
      'title': 'Trang chủ',
      'link': "/",
    },
    {
      'title': 'Sản phẩm',
      'link': '/products'
    },
    {
      'title': 'Thiết kế',
      'link': '/design'
    },
    {
      'title': 'Liên hệ',
      'link': '/contact'
    },
  ]

  return (
    <header className="flex flex-col items-center justify-center gap-2">
      <div
        className="top-bar w-full h-[37px] flex flex-rows items-center justify-center py-2 text-white bg-[#0055C3]"
      >
        Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND
      </div>
      <div
        className="nav-bar flex flex-rows items-center justify-between h-12 px-16 w-full"
      >
        <nav className="flex flex-row justify-start items-center gap-8">
          {_.map(navBar, (item, index) => (
            <NavLink key={index} to={item.link} className={({ isActive }) =>
              `flex flex-rows text-base hover:no-underline ${isActive ? 'text-[#0055C3] font-bold' : 'text-black hover:text-[#0255C3]'}`
            }>
              {item.title}
            </NavLink>
          ))}
        </nav>
        <img
          src="/images/Logo.png"
          alt="Logo"
          className="logo w-[157px] h-[45px] cursor-pointer lg:mr-56"
          onClick={() => navigate('/')}
        />
        <div
          className="nav-act flex flex-rows gap-4"
        >
          <IoSearch className="cursor-pointer w-6 h-6" />
          <IoPersonOutline className="cursor-pointer w-6 h-6" />
          <IoCartOutline className="cursor-pointer w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
