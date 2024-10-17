import { NavLink } from "@remix-run/react";
import _ from "lodash";
import { useGetProfile } from "~/data";

const links = [
  {
    to: '/profile',
    label: 'Hồ sơ của tôi'
  },
  {
    to: '/orders',
    label: 'Đơn hàng'
  },
];

export const ProfileSidebar = () => {
  const profile = useGetProfile();

  return (
    <div className="">
      
      <div className="flex justify-center pt-7  space-x-3">
        <img className="w-20 h-20 rounded-full" src={profile.data?.user?.avatar?.[0].value || '/images/avatar.png'} alt="Profile" />
        <div className="flex mt-7 my-4 text-black text-lg font-semibold font-['Noto Serif']">
          {profile.data?.detail.name}
        </div>
      </div>

   
      <div className="my-7 space-y-8">
        {_.map(links, (link, index) => (
          <NavLink 
            key={index} 
            to={link.to}
            className={({ isActive }) =>
              `block  font-semibold font-['Noto Serif'] p-4 border-2 rounded-r-3xl w-full ${isActive ? 'bg-[#0055C3] text-white border-[#0055C3] hover:text-white hover:no-underline' : 'bg-white text-black border-gray-300 hover:no-underline'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
