import request, { BASE_URL } from "./request";
import { Customization } from "./types";

export async function createCustomProduct(token: string, data: Customization): Promise<any> {
  return await request.post(`${BASE_URL}/api/CustomProduct`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}