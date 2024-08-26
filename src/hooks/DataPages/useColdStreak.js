import { useQuery } from "@tanstack/react-query";

import { coldStreak } from "../../functions/dataPages/coldStreak";

export default function useColdStreak() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["coldStreak"],
    queryFn: () => coldStreak(mensagens),
    retry: false,
  });
  return { isLoading, data, error };
}
