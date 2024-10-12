import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Account } from "./types";

export async function getAllAccount(token: string, pageIndex: number, pageSize: number): Promise<Account[]> {
  return await request.get(`${BASE_URL}/api/Account/${pageIndex}/${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
export async function getAccountById(token: string, accountId: number): Promise<Account> {
  return await request.get(`${BASE_URL}/api/Account/${accountId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const useGetAllAccount = (
  token: string,
  pageIndex: number,
  pageSize: number,
  config?: UseQueryOptions<Account[]>) => {
  return useQuery({
    queryKey: ['account', token, pageIndex, pageSize],
    queryFn: () => getAllAccount(token, pageIndex, pageSize),
    enabled: !!token,
    ...config,
  })
}