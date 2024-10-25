// import { Link, NavLink, useMatches, useNavigate } from "@remix-run/react";
// import _ from "lodash";
// import Cart from "./Cart"; // Import Cart component
// import { IoLogOut, IoPersonOutline } from "react-icons/io5";
// import { useGetProfile } from "~/data";

// export const Header = () => {
//   const navigate = useNavigate();
//   const profile = useGetProfile();
//   const user = profile.data?.detail.id;
//   const matches = useMatches();
//   const last = (_.last(matches) as any)?.handle;

//   const navBar = [
//     {
//       title: "Trang chủ",
//       link: "/",
//     },
//     {
//       title: "Sản phẩm",
//       link: "/products",
//     },
//     {
//       title: "Thiết kế",
//       link: "/design",
//     },
//     {
//       title: "Liên hệ",
//       link: "/contact",
//     },
//   ];

//   if (last?.hideHeader) return;

//   return (
//     <header className="absolute top-0 w-full">
//       <div className="flex flex-col items-center justify-center gap-2">
//         <div className="top-bar w-full h-[37px] flex flex-rows items-center justify-center py-2 text-white bg-[#0055C3]">
//           Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND
//         </div>
//         <div className="nav-bar flex flex-rows items-center justify-between w-full h-12 px-16">
//           <nav className="flex flex-row justify-start items-center space-x-8">
//             {_.map(navBar, (item, index) => (
//               <NavLink
//                 key={index}
//                 to={item.link}
//                 className={({ isActive }) =>
//                   `flex flex-rows text-base hover:no-underline ${isActive
//                     ? "text-[#0055C3] font-bold"
//                     : "text-black hover:text-[#0255C3]"
//                   }`
//                 }
//               >
//                 {item.title}
//               </NavLink>
//             ))}
//           </nav>
//           <div className="flex items-center -translate-x-1/2">
//             <img
//               src="/images/Logo.png?v=1"
//               alt="Logo"
//               className="logo w-[157px] h-[45px] cursor-pointer"
//               onClick={() => navigate("/")}
//             />
//           </div>
//           <div className="nav-act flex flex-rows gap-[20px] relative uk-inline">
//             <IoPersonOutline
//               className="cursor-pointer w-6 h-6"
//               onClick={() => {
//                 if (user) {
//                   navigate("/profile");
//                 } else {
//                   navigate("/login");
//                 }
//               }}
//             />
//             {/* <img
//               className="cursor-pointer w-6 h-6"
//               src="/icons/person.png"
//               alt="Person Icon"
//               onClick={() => {
//                 if (user) {
//                   navigate("/profile");
//                 } else {
//                   navigate("/login");
//                 }
//               }}
//             /> */}
//             {user && (
//               <div uk-dropdown="">
//                 <Link to={'/logout?redirectTo=/?logout=true'} className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md p-3">
//                   <IoLogOut className="w-5 h-5 cursor-pointer text-inherit" />
//                   <span className="text-xs">Đăng xuất</span>
//                 </Link>
//               </div>
//             )}
//             <Cart />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
import { useState } from 'react';
import { Link, NavLink, useMatches, useNavigate } from "@remix-run/react";
import _ from "lodash";
import Cart from "./Cart"; // Import Cart component
import { IoLogOut, IoPersonOutline, IoMenu, IoClose } from "react-icons/io5"; // Import thêm menu và close icon
import { useGetProfile } from "~/data";

export const Header = () => {
  const navigate = useNavigate();
  const profile = useGetProfile();
  const user = profile.data?.detail.id;
  const matches = useMatches();
  const last = (_.last(matches) as any)?.handle;
  const [menuOpen, setMenuOpen] = useState(false); // State để quản lý việc mở menu trên điện thoại

  const navBar = [
    {
      title: "Trang chủ",
      link: "/",
    },
    {
      title: "Sản phẩm",
      link: "/products",
    },
    {
      title: "Thiết kế",
      link: "/design",
    },
    {
      title: "Liên hệ",
      link: "/contact",
    },
  ];

  if (last?.hideHeader) return null;

  return (
    <header className="absolute top-0 w-full bg-white z-10">
      <div className="flex flex-col items-center justify-center gap-2">

        <div className="top-bar w-full h-[37px] flex items-center justify-center text-center py-2 bg-[#0055C3]">
          <span className='text-white font-medium text-center text-xs max-[375px]:text-2xs sm:text-base'>Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND</span>
        </div>


        <div className="nav-bar flex items-center justify-between w-full h-12 px-4 sm:px-16">

          <div className="min-[768px]:hidden w-1/2 ">
            {menuOpen ? (
              <IoClose className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
            ) : (
              <IoMenu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
            )}
          </div>

          <nav className="max-[767px]:hidden flex items-center space-x-8">
            {_.map(navBar, (item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `text-base hover:no-underline ${isActive ? "text-[#0055C3] font-bold" : "text-black hover:text-[#0255C3]"}`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>


          <div className="flex-1 flex justify-center">
            <img
              src="/images/Logo.png?v=1"
              alt="Logo"
              className="logo w-[120px] h-[35px] sm:w-[157px] sm:h-[45px] cursor-pointer mr-24"
              onClick={() => navigate("/")}
            />
          </div>


          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <img src={profile.data?.detail.avatar || '/images/avatar.png'} alt="avatar" className='rounded-full w-6 h-6 sm:w-8 sm:h-8 object-cover cursor-pointer'
                onClick={() => navigate("/profile")}
              />
            ) : (
              <IoPersonOutline
                className="cursor-pointer w-6 h-6 sm:w-7 sm:h-7"
                onClick={() => {
                  navigate("/login")
                }}
              />
            )}

            {user && (
              <div uk-dropdown="">
                <Link
                  to="/logout?redirectTo=/?logout=true"
                  className="flex items-center justify-center hover:no-underline no-underline gap-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md p-3"
                >
                  <IoLogOut className="w-5 h-5 cursor-pointer text-inherit" />
                  <span className="text-xs">Đăng xuất</span>
                </Link>
              </div>
            )}
            <Cart />
          </div>
        </div>


        {menuOpen && (
          <div className="sm:hidden bg-white p-4 absolute w-1/2 top-24 left-0 shadow-md">
            <nav className="flex flex-col space-y-4">
              {navBar.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `text-base hover:no-underline ${isActive ? "text-[#0055C3] font-bold" : "text-black hover:text-[#0255C3]"}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
