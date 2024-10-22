import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Account,DashboardResponse } from "./types";

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
export async function getDashboardData(token: string, filter: string = 'Day'): Promise<DashboardResponse> {
  return await request.get(`${BASE_URL}/api/Admin/dashboard?filter=${filter}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}
export const useGetDashboardData = (
  token: string,
  filter: string = 'Day',
  config?: UseQueryOptions<DashboardResponse>
) => {
  return useQuery({
    queryKey: ['dashboard', token, filter],
    queryFn: () => getDashboardData(token, filter),
    enabled: !!token,
    ...config,
  });
};

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