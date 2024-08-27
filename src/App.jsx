import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import HomePage from "./HomePage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataPages from "./DataPages.jsx";
import { useEffect, useState } from "react";
import useTransformData from "./hooks/useTransformData.js";
import { DataProvider } from "./context/dataContext.jsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <DataProvider>
        <HomePage />
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
