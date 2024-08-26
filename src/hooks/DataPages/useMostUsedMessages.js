import { useQuery } from "@tanstack/react-query";
import { mostUsedMessages } from "../../functions/dataPages/mostUsedMessages";

export default function useMostUsedMessages() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });
  const { isLoading, data, error } = useQuery({
    queryKey: ["mostUsedMessages"],
    queryFn: () => mostUsedMessages(mensagens),
  });

  return { isLoading, data, error };
}
