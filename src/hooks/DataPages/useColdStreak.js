import { useQuery } from "@tanstack/react-query";
import { messageStreak } from "../../functions/DataPages/messageStreak";

export default function useMessageStreak() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messageStreak"],
    queryFn: () => messageStreak(mensagens),
  });

  return { isLoading, data, error };
}
