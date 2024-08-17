import { useQuery } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { User } from "./types";

async function login(username: string, password: string) {
  return request.post(`${BASE_URL}/login`, { username, password }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

async function getUsers(token: string): Promise<User[]> {
  return request.get(`https://jsonplaceholder.typicode.com/users/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const useGetUsers = (userId: number = 1, token: string) => {
  return useQuery<User[]>({
    queryKey: ['users', userId],
    queryFn: () => getUsers(token),
  })
}