import { useQuery } from "@tanstack/react-query";
import { mostUsedWords } from "../../functions/DataPages/mostUsedWords";

export default function useMostUsedWords() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["mostUsedWords"],
    queryFn: () => mostUsedWords(mensagens),
  });

  return { isLoading, data, error };
}
