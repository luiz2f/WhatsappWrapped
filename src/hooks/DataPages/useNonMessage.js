import { useQuery } from "@tanstack/react-query";
import { NonMessage } from "../../functions/dataPages/NonMessage";

export default function useNonMessage() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["NonMessage"],
    queryFn: () => NonMessage(mensagens),
  });

  return { isLoading, data, error };
}
