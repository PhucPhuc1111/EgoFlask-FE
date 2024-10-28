import axios from "axios";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { parseFormData } from "remix-hook-form";
import { Profile } from "~/data";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "~/data/request";
import { LoginFormData } from "~/routes/login";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from 'remix-auth-google'

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
      throw new AuthorizationError("Internal Server Error", { name: `${error}`, message: `${error?.response?.data?.message || error?.response?.data}` })
    }
  }),
  "user-pass"
);

// Set up GoogleStrategy
const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URI,
    accessType: "online",
    scope: ["profile", "email"],
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.log('====google profile', profile, accessToken, refreshToken, extraParams);
    const result = await axios.post(`${BASE_URL}/api/Account/login-with-google`, extraParams.id_token, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('====login result', JSON.stringify(result.data))
    let response = {
      ...result.data,
      avatar: profile.photos,
    } as Profile;
    return response;
    // return {
    //   profile,
    //   accessToken,
    //   refreshToken,
    //   extraParams,
    // };
  }
);

authenticator.use(googleStrategy, "google");