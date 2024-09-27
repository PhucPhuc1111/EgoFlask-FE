import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import axios from "axios";
import { BASE_URL } from "~/data/request";

export async function loader({ params, request }: LoaderFunctionArgs) {
  let token = params.slug;
  let url = new URL(request.url);
  let email = url.searchParams.get('email');
  console.log(email, token);
  
  if (email && token) {
    try {
      let response = await axios.post(`${BASE_URL}/api/Account/verify-create-account`, {
        email,
        token,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        return redirect(`/verify-register/success?message=${encodeURIComponent('Đăng ký tài khoản thành công')}`);
      }
    } catch (error: any) {
      console.log(error);
      
      return redirect(`/verify-register/error?message=${encodeURIComponent(error.response.data)}`);
    }
  }
  return json({}, { status: 200 });
}