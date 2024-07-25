import { useQuery } from "@tanstack/react-query";
import { wordCount } from "../../functions/DataPages/wordCount";

export default function useWordCount() {
  const { data: mensagens } = useQuery({
    queryKey: ["messages"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["wordCount"],
    queryFn: () => wordCount(mensagens),
  });

  return { isLoading, data, error };
}
