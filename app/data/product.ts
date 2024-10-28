import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { Product } from "./types";
import { AddProductForm } from "~/components/ProductModal/AddProductModal";
import { UpdateProductForm } from "~/components/ProductModal/UpdateProductModal";

export async function getAllProducts(pageIndex: number, pageSize: number, search: string): Promise<Product[]> {
  return await request.get(`${BASE_URL}/api/Product?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
}

export async function getProductById(id: string): Promise<Product> {
  return await request.get(`${BASE_URL}/api/Product/${id}`);
}

export async function addProduct(product: AddProductForm, token: string) {
  try {
    const formData = new FormData();

    formData.append("ProductKey", product.productKey || 'null');
    formData.append("Name", product.name);
    formData.append("ImageUrl", product.imageUrl as any); 
    formData.append("Description", product.description || 'null');
    formData.append("Guides", product.guides || 'null');
    formData.append("Price", String(product.price));
    formData.append("Inventory", String(product.inventory));
    formData.append("Engrave", product.engrave || 'null');
    formData.append("Status", product.status || 'ACTIVE');

    return await request.postMultiPart(`${BASE_URL}/api/Product`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  } catch (error: any) {
    console.error("Error adding product:", error?.response || error?.message);
    throw error;
  }
}
export async function updateProduct(id: string, formData: FormData, token: string) {
  try {
  
    const response = await request.putMultiPart(`${BASE_URL}/api/Product/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    
    return response;

  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProductById(id: string, token: string): Promise<void> {
  return await request.deleteWithOptions(`${BASE_URL}/api/Product/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
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
