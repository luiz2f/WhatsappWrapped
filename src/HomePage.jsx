import React, { useEffect, useState } from "react";
import useTransformData from "./hooks/useTransformData";
import FileInput from "./ui/FileInput";
import Spinner from "./ui/Spinner";
import DataPages from "./DataPages";
import Form from "./Form";

function HomePage() {
  const [conversa, setConversa] = useState("");
  const { isLoading, data, error } = useTransformData(conversa);
  useEffect(() => {
    if (!isLoading && data) {
      const element = document.querySelector("#msgqty");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isLoading, data]);
  const isLoadingJs = !!conversa;
  return (
    <>
      <Form
        setConversa={setConversa}
        isLoadingJs={isLoadingJs}
        error={error}
        data={data}
      />
      {data && <DataPages />}
    </>
  );
}

export default HomePage;
