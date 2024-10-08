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
  if (!user) return redirect('/login');
  else if (String(user?.role)?.toLowerCase() === 'user') return redirect('/');
  return json({}, { status: 200 });
}

export default function Admin() {
  return (
    <Fragment>
      <AdminHeader />
      <div className="flex h-full">
        <AdminSidebar className="w-[300px] h-screen bg-[#0055C3] flex flex-col" />
        <main className="flex-1 mt-32 h-full pl-8">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}