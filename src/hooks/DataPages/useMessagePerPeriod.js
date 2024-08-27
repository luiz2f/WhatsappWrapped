import { useQuery } from "@tanstack/react-query";
import { messagesPerPeriod } from "../../functions/dataPages/messagesPerPeriod";

export default function useMessagePerPeriod() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { data: usuarios } = useQuery({
    queryKey: ["usuarios"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messagePerPeriod"],
    queryFn: () => messagesPerPeriod(mensagens, usuarios),
    retry: false,
  });

  return { isLoading, data, error };
}
