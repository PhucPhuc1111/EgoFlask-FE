import { useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useGetProfile } from "~/data";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const profile = useGetProfile();
  const user = profile.data?.detail.id;

  return (
    <header className="absolute top-0 w-full z-10 bg-white pb-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="top-bar w-full h-[37px] flex flex-rows items-center justify-between py-2 text-white bg-[#0055C3]">
        </div>
        <div className="nav-bar flex flex-rows items-center justify-center w-full h-12 px-16">
          <div className="flex flex-row justify-start items-center space-x-8 w-full">
            <img src={profile.data?.user?.avatar?.[0].value || '/images/avatar.png'} alt="avatar" className="w-[51px] h-[51px] rounded-full" />
            <span className="text-black font-semibold text-base">
              {profile.data?.detail.name}
            </span>
          </div>
          <div className="flex items-center justify-center -translate-x-1/2 w-full">
            <img
              src="/images/Logo.png?v=1"
              alt="Logo"
              className="logo w-[157px] h-[45px] cursor-pointer"
              onClick={() => navigate("/admin")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}