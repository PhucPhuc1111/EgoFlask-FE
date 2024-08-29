import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";

export let authenticator = new Authenticator<any>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {

  }),
  "user-pass"
);