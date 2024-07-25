import { useQuery } from "@tanstack/react-query";

export default function useData() {
  const { isLoading, data, error } = useQuery("messages");

  return { isLoading, data, error };
}
