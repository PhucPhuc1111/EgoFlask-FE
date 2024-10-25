import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import { AdminHeader, AdminSidebar } from "~/components"
import { authenticator } from "~/services/auth.server";

export const handle = {
  hideHeader: true,
  hideFooter: true,
  adminHeader: true,
  adminSidebar: true,
}

export async function loader({ request }: LoaderFunctionArgs) {
  let user = await authenticator.isAuthenticated(request);
  console.log('user', user);
  
  if (!user) return redirect('/login');
  else if (String(user?.role)?.toLowerCase() === 'user') return redirect('/');
  return json({}, { status: 200 });
}

export default function Admin() {
  return (
    <Fragment>
      <AdminHeader />
      <div className="flex h-screen max-h-screen">
        <AdminSidebar className="w-[300px] h-full bg-[#0055C3] flex flex-col justify-between" />
        <Outlet />
      </div>
    </Fragment>
  );
}