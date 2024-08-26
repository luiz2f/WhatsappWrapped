import { useQuery } from "@tanstack/react-query";
import { mostUsedEmojis } from "../../functions/dataPages/emojis";

export default function useEmojis() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });
  const { isLoading, data, error } = useQuery({
    queryKey: ["emojis"],
    queryFn: () => mostUsedEmojis(mensagens),
    retry: false,
  });

  return { isLoading, data, error };
}
