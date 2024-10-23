import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");
  const showUnauthorizedMessage = encodeURIComponent('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.');
  return await authenticator.logout(request, {
    redirectTo: redirectTo || `/?message=${showUnauthorizedMessage}&type=error`,
  })
}