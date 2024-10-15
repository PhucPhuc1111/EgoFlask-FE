import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Product } from "./types";

export async function getAllProducts(pageIndex: number, pageSize: number, search: string): Promise<Product[]> {
  return await request.get(`${BASE_URL}/api/Product?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getProductById(id: string): Promise<Product> {
  return await request.get(`${BASE_URL}/api/Product/${id}`);
}

export const useGetAllProducts = (
  pageIndex: number,
  pageSize: number,
  search: string,
  config?: UseQueryOptions<Product[]>
) => {
  return useQuery({
    queryKey: ["products", pageIndex, pageSize, search],
    queryFn: () => getAllProducts(pageIndex, pageSize, search),
    ...config,
  });
}