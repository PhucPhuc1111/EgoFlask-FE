import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { ApproveOrder, Order } from "./types";

export async function getAllOrder(token: string): Promise<Order[]> {
  return await request.get(`${BASE_URL}/api/Order`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}

export async function approveOrder(token: string, body: ApproveOrder): Promise<any> {
  return await request.post(`${BASE_URL}/api/Order/supplierOrder`, body, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export const useGetAllOrder = (token: string, config?: UseQueryOptions<Order[]>) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => getAllOrder(token),
    enabled: !!token,
    ...config,
  });
}