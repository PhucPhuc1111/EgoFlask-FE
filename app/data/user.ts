import { RegisterForm } from "~/routes/register";
import request, { BASE_URL } from "./request";
import { Profile, User } from "./types";
import { useQuery } from "@tanstack/react-query";

export async function registerAccount(user: RegisterForm) {
  return await request.post(`${BASE_URL}/api/Account/signup`, {
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    phoneNumber: user.phone,
    password: user.password,
  }, {
    headers: {
      "Content-Type": "application/json",
    },
  }); 
}

export function getMe(token: string): Promise<User> {
  return request.get(`${BASE_URL}/me`, {
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