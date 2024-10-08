import { Link, NavLink, useMatches, useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useGetProfile } from "~/data";

type AdminSidebarProps = {
  className: string;
};

export const AdminSidebar = ({ className }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const profile = useGetProfile();
  const user = profile.data?.detail.id;
  const matches = useMatches();
  const last = (_.last(matches) as any)?.handle;

  if (!last?.adminHeader) return;
  const navBar = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Khách hàng",
      link: "/admin/customer",
    },
    {
      title: "Đơn hàng",
      link: "/admin/order",
    },
    {
      title: "Kho hàng",
      link: "/admin/inventory",
    },
    {
      title: "Danh mục sản phẩm",
      link: "/admin/category",
    },
  ];
  if (!last?.adminSidebar) return;
  return (
    <div className={`${className}`}>
      <nav className="flex flex-col items-start justify-center translate-y-1/2 space-y-8">
        {_.map(navBar, (item, index) => (
          <NavLink key={index} to={item.link}
            className={({ isActive }) =>
              `${isActive ? 'text-white hover:bg-white' : 'bg-white text-black'} 
            hover:no-underline font-bold text-base text-end pr-12 py-4 rounded-r-full border-t-[1px] border-b-[1px] border-r-[1px] w-full`
            }
          >
            {item.title}
          </NavLink>
        ))}

      </nav>
      <div className="h-full pb-12 pl-12 flex items-end ">
        <Link to={'/logout'} className="text-white text-base hover:no-underline hover:text-slate-300">
          Đăng xuất
        </Link>
      </div>
    </div>
  )
}