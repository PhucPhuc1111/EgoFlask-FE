import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { AddToCartRQ, ApproveOrder, Order } from "./types";
import { CartItem } from "~/components/Cart";

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

export async function addToCart(token: string, body: AddToCartRQ): Promise<any> {
  return request.post(`${BASE_URL}/api/Order/add-to-cart`, body, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}

export async function removeFromCart(token: string, orderDetailId: string) {
  return request.deleteWithOptions(`${BASE_URL}/api/Order/remove-from-cart/${orderDetailId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
}

export async function getInCart(token: string): Promise<CartItem[]> {
  return request.get(`${BASE_URL}/api/Order/incart`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
}

export const useGetAllOrder = (token: string, config?: UseQueryOptions<Order[]>) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => getAllOrder(token),
    enabled: !!token,
    ...config,
  });
}

export const useGetInCart = (token: string, config?: UseQueryOptions<CartItem[]>) => {
  return useQuery({
    queryKey: ["in-cart"],
    queryFn: () => getInCart(token),
    enabled: !!token,
    ...config,
  });
}