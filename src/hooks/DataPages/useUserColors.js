import { useQuery } from "@tanstack/react-query";

export default function useUserColors() {
  const { data: wordCount } = useQuery({
    queryKey: ["wordCount"],
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["usersColors"],
    queryFn: () => getUserColors(wordCount),
  });
  function getUserColors(words) {
    let usersColors = {};
    const usersArray = Object.entries(words);
    for (let i = 0; i < usersArray.length; i++) {
      const user = usersArray[i][0];
      const userNum = `user${i + 1}`;
      usersColors[user] = userNum;
    }
    return usersColors;
  }
  return { isLoading, data, error };
}
