import request, { BASE_URL } from "./request";
import { Account } from "./types";

export async function getAllAccount(token: string, pageIndex: number, pageSize: number): Promise<Account[]> {
    return await request.get(`${BASE_URL}/api/Account/${pageIndex}/${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
export async function getAccountById(token: string, accountId:number): Promise<Account>{
  return await request.get(`${BASE_URL}/api/Account/${accountId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}