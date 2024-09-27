import { RegisterForm } from "~/routes/register";
import request, { BASE_URL } from "./request";
import { Profile, User } from "./types";
import { useQuery } from "@tanstack/react-query";
import { ForgotPasswordForm } from "~/routes/forgot-password.$slug";

export async function registerAccount(user: RegisterForm) {
  return await request.post(`${BASE_URL}/api/Account/signup`, {
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    phoneNumber: user.phone,
    password: user.password,
    verifiedUrl: `${window.location.origin}/verify-register/{token}`
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  }); 
}

export function getMe(token: string): Promise<User> {
  return request.get(`${BASE_URL}/api/Account/whoami`, {
    headers: {
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${token}`,
    },
  });
}

export function getProfile(): Promise<{ user?: Profile, detail: User }> {
  return request.get(`/api/me`);
}

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}

export async function forgotPassword(email: string) {
  return await request.post(`${BASE_URL}/api/Account/forgot-password`, {
    email,
    verifiedUrl: `${window.location.origin}/forgot-password/{token}`,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function forgotPasswordReset(body: ForgotPasswordForm, token: string) {
  return await request.post(`${BASE_URL}/api/Account/reset-password`, {
    email: body.email,
    password: body.password,
    token,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}