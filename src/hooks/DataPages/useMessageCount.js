import { useQuery } from "@tanstack/react-query";
import { messageCount } from "../../functions/dataPages/messageCount";

export default function useMessageCount(mensagens) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["messageCount"],
    queryFn: () => messageCount(mensagens),
  });
  console.log(data);

  return { isLoading, data, error };
}
