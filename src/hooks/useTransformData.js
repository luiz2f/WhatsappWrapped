import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformData } from "../functions/transformData";

export default function useTransformData(chat) {
  const queryClient = useQueryClient();
  const usuarios = [];
  const { isLoading, data, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => transformData(chat),
    enabled: !!chat, // A query só será executada se a conversa não for nula
  });
  if (data) {
    data.slice(0, 100).forEach((mensagem) => {
      if (usuarios.length < 2 && !usuarios.includes(mensagem.usuario)) {
        usuarios.push(mensagem.usuario); // Adicione à array se ainda não existir
      }
    });
    queryClient.setQueryData(["usuarios"], usuarios); // Defina os dados da query como a array de usuários
  }

  return { isLoading, data, error };
}
