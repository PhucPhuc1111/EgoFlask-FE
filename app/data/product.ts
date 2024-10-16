import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Product } from "./types";
import { AddProductForm } from "~/components/ProductModal/AddProductModal";

export async function getAllProducts(pageIndex: number, pageSize: number, search: string): Promise<Product[]> {
  return await request.get(`${BASE_URL}/api/Product?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getProductById(id: string): Promise<Product> {
  return await request.get(`${BASE_URL}/api/Product/${id}`);
}

export async function addProduct(product: AddProductForm) {
  return await request.post(`${BASE_URL}/api/Product`, JSON.stringify({
    name: product.name,
    imageUrl: product.imageUrl,
    description: product.description,
    guides: product.guides,
    price: product.price,
    inventory: product.inventory,
    engrave: product.engrave || '',
    createAt: product.createAt || new Date().toISOString(), 
    status: product.status || 'ACTIVE', 
  }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteProductById(id: string): Promise<void> {
  return await request.delete(`${BASE_URL}/api/Product/${id}`);
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