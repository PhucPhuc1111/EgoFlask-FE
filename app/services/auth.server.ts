import axios from "axios";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { parseFormData } from "remix-hook-form";
import { Profile } from "~/data";
import { BASE_URL } from "~/data/request";
import { LoginFormData } from "~/routes/login";
import { sessionStorage } from "~/services/session.server";

export let authenticator = new Authenticator<any>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let { email, password, loginType, verifyUrl } = await parseFormData<LoginFormData>(form);
    console.log('loginType', loginType);
    
    try {
      if (loginType == 'user-pass') {
        const result = await axios.post(`${BASE_URL}/api/Account/Login`, { 
          email, 
          password: password.toString(),
          verifyUrl,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('====login result', JSON.stringify(result.data))
        let response = result.data as Profile;
        return response;
      }
    } catch (error: any) {
      console.log('====login error', error.response.data);
      throw new AuthorizationError("Internal Server Error", { name: `${error}`, message: `${error.response.data}` })
    }
  }),
  "user-pass"
);