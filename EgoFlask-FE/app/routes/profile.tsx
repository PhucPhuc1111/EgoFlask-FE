import { Link, Outlet, useNavigate } from "@remix-run/react";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <main className="mt-[--m-header-top]">
      Profile
      <button
      >
        Click
      </button>
      <Outlet />
    </main>
  )
}