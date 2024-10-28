import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL, GHN_API_TOKEN, GHN_API_URL } from "./request";
import { AddToCartRQ, ApproveOrder, CartRS, CheckoutRQ, DistrictResponse, Order, OrderTransaction, PaymentResponse, ProvinceResponse, WardResponse } from "./types";

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

export async function getInCart(token: string): Promise<CartRS[]> {
  return request.get(`${BASE_URL}/api/Order/incart`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
}

export async function checkout(token: string, body: CheckoutRQ): Promise<PaymentResponse> {
  return request.post(`${BASE_URL}/api/Order/payment?paymentmethod=${body.paymentMethod}&returnUrl=${body.returnUrl}&cancelUrl=${body.cancelUrl}`, undefined, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function payOsCallBack(body: OrderTransaction): Promise<any> {
  return request.post(`${BASE_URL}/api/Order/payos-callback`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getDistricts(): Promise<DistrictResponse> {
  return request.get(`${GHN_API_URL}/district`, {
    headers: {
      'token': GHN_API_TOKEN,
    }
  });
}

export async function getWards(districtId: number): Promise<WardResponse> {
  return request.get(`${GHN_API_URL}/ward?district_id=${districtId}`, {
    headers: {
      'token': GHN_API_TOKEN,
    }
  });
}

export async function getProvinces(): Promise<ProvinceResponse> {
  return request.get(`${GHN_API_URL}/province`, {
    headers: {
      'token': GHN_API_TOKEN,
    }
  });
}

export const useGetProvinces = (
  config?: UseQueryOptions<ProvinceResponse>
) => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: getProvinces,
    ...config,
  })
}

export const useGetDistricts = (
  config?: UseQueryOptions<DistrictResponse>
) => {
  return useQuery({
    queryKey: ['districts'],
    queryFn: getDistricts,
    ...config,
  })
}

export const useGetWards = (
  districtId: number,
  config?: UseQueryOptions<WardResponse>
) => {
  return useQuery({
    queryKey: ['wards', districtId],
    queryFn: () => getWards(districtId),
    enabled: !!districtId,
    ...config,
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

export const useGetInCart = (token: string, config?: UseQueryOptions<CartRS[]>) => {
  return useQuery({
    queryKey: ["in-cart"],
    queryFn: () => getInCart(token),
    enabled: !!token,
    retry: 1,
    ...config,
  });
}