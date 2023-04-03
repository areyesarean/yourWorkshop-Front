import axios from "axios";
import { baseUrl } from "./constants";
import { MutationKey, QueryKey } from "@tanstack/react-query";

interface QueryData {
  queryKey: QueryKey;
}

interface MutationData {
  queryKey: MutationKey;
}

export const defaultQueryFn = async ({ queryKey }: QueryData) => {
  const data = await axios.get(`${baseUrl}${queryKey[0]}`);
  return data;
};

export const defaultMutationFn = async ({ queryKey }: MutationData) => {
  const data = await axios.post(`${baseUrl}${queryKey[0]}`, queryKey[1]);
  return data;
};
