import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import request, { BASE_URL } from "./request";
import { BottleComponent } from "./types";

export async function getComponentList(search: string): Promise<BottleComponent[]> {
  return await request.get(`${BASE_URL}/api/component?search=${search}`)
}

export const useGetComponentList = (
  search: string,
  config?: Partial<UseQueryOptions<BottleComponent[]>>
) => {
  return useQuery<BottleComponent[]>({
    queryKey: ["component", search],
    queryFn: () => getComponentList(search),
    ...config,
  })
}