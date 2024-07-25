import { useQuery } from "@tanstack/react-query";
import { messageStreak } from "../../functions/DataPages/messageStreak";
import { coldStreak } from "../../functions/DataPages/coldStreak";

export default function useColdStreak() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["coldStreak"],
    queryFn: () => coldStreak(mensagens),
  });

  return { isLoading, data, error };
}
