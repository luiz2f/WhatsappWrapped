import React, { useEffect } from "react";

import Form from "./Form";
import DataPages from "./DataPages";
import useData from "./context/useData";

function HomePage() {
  const { messageQuantity } = useData();

  return (
    <>
      {messageQuantity ? (
        <DataPages />
      ) : (
        <Form messageQuantity={messageQuantity} />
      )}
    </>
  );
}

export default HomePage;
