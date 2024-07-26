import { useQuery } from "@tanstack/react-query";
import { messageCount } from "../../functions/dataPages/messageCount";

export default function useMessageCount() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["messageCount"],
    queryFn: () => messageCount(mensagens),
  });

  return { isLoading, data, error };
}
