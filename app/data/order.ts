import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Order } from "./types";

export async function getAllOrder(token: string): Promise<Order[]> {
  return await request.get(`${BASE_URL}/api/Order`, {
    headers: {
      "Authorization": `Bearer ${token}`,
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