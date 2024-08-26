import { useQuery } from "@tanstack/react-query";
import { wordCount } from "../../functions/dataPages/wordCount";

export default function useWordCount(mensagens) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["wordCount"],
    queryFn: () => wordCount(mensagens),
  });

  return { isLoading, data, error };
}
