import { useQuery } from "@tanstack/react-query";
import { messageStreak } from "../../functions/dataPages/messageStreak";

export default function useMessageStreak() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messageStreak"],
    queryFn: () => messageStreak(mensagens),
    retry: false,
  });

  return { isLoading, data, error };
}
