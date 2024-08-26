import { useQuery } from "@tanstack/react-query";
import { nonMessage } from "../../functions/dataPages/nonMessage";

export default function useNonMessage() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["NonMessage"],
    queryFn: () => nonMessage(mensagens),
    retry: false,
  });

  return { isLoading, data, error };
}
