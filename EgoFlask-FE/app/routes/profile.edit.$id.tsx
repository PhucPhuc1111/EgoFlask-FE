import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect } from "react";

type Params = {
  param: string;
  username: string;
}

export function loader({params, request}: LoaderFunctionArgs) {
  let param = params.id;
  let url = new URL(request.url);
  let username = url.searchParams.get('username');
  return json({param, username}, {status: 200});
}

export default function ProfileUsername() {
  let { param, username } = useLoaderData<Params>();
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location])
  

  return (
    <main className="mt-[--m-header-top]">
      Profile username {param} {username}
    </main>
  )
}