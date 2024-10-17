import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',    // Where to redirect upon success
    failureRedirect: '/login', // Where to redirect upon failure
  });
}