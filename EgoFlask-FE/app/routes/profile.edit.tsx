import { Outlet } from "@remix-run/react";

export default function ProfileEdit() {
  return (
    <main className="mt-[--m-header-top]">
      Profile edit
      <Outlet />
    </main>
  )
}