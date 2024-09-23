import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");
  return await authenticator.logout(request, {
    redirectTo: redirectTo || "/",
  })
}