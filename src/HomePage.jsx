import React, { useEffect, useState } from "react";
import useTransformData from "./hooks/useTransformData";
import FileInput from "./ui/FileInput";
import Spinner from "./ui/Spinner";
import DataPages from "./DataPages";
import Form from "./Form";
import useUserColors from "./hooks/dataPages/useUserColors";
import { useData } from "./context/dataContext";

function HomePage() {
  const { setConversa } = useData();
  const { isLoading, data, error } = useTransformData(conversa);

  useEffect(() => {
    if (!isLoading && data) {
      const element = document.querySelector("#msgqty");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isLoading, data]);
  const { data: usersColors } = useUserColors();

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
