import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Stock } from "./types";

export async function getStock(token: string, pageIndex: number = 1, pageSize: number = 10, search: string = ""): Promise<Stock[]> {
  return await request.get(`${BASE_URL}/api/Stock?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

export async function getStockCount(token: string): Promise<number> {
  return await request.get(`${BASE_URL}/api/Stock/count`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const useGetStock = (token: string, pageIndex?: number, pageSize?: number, search?: string, config?: UseQueryOptions<Stock[]>) => {
  return useQuery({
    queryKey: ['stock', pageIndex, pageSize, search],
    queryFn: () => getStock(token, pageIndex, pageSize, search),
    enabled: !!token,
    ...config,
  })
}

export const useGetStockCount = (token: string, config?: UseQueryOptions<number>) => {
  return useQuery({
    queryKey: ['stock-count'],
    queryFn: () => getStockCount(token),
    enabled: !!token,
    ...config
  });
}