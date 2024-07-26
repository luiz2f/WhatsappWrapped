import { useQuery } from "@tanstack/react-query";
import { messageStreak } from "../../functions/dataPages/messageStreak";

export default function useColdStreak() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messageStreak"],
    queryFn: () => messageStreak(mensagens),
  });

  return { isLoading, data, error };
}
