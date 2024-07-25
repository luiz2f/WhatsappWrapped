import { useQuery } from "@tanstack/react-query";
import { messagesPerPeriod } from "../../functions/DataPages/messagesPerPeriod";

export default function useMessagePerPeriod() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messagePerPeriod"],
    queryFn: () => messagesPerPeriod(mensagens),
  });

  return { isLoading, data, error };
}
