import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import HomePage from "./HomePage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <HomePage />
    </QueryClientProvider>
  );
}

export default App;
