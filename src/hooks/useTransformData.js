import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformData } from "../functions/transformData";

export default function useTransformData(chat) {
  const queryClient = useQueryClient();
  const usuarios = [];
  const { isLoading, data, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => transformData(chat),
    enabled: !!chat, // A query só será executada se a conversa não for nula
  });

  return { isLoading, data, error };
}
