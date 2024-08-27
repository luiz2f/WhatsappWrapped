import { Suspense, useEffect } from "react";
import AudioQuantity from "./dataPages/AudioQuantity";
import ColdStreak from "./dataPages/ColdStreak";
import ImageQuantity from "./dataPages/ImageVideoQuantity";
import MessageQuantity from "./dataPages/MessageQuantity";
import MessageStreak from "./dataPages/MessageStreak";
import StickerQuantity from "./dataPages/StickerQuantity";
import useUserColors from "./hooks/dataPages/useUserColors";
import WidthGraphs from "./dataPages/WidthGraphs";
import { userToClassName } from "./functions/userToClassName";
import Spinner from "./ui/Spinner";
import NonMessage from "./dataPages/NonMessage";

function DataPages() {
  return (
    <>
      <MessageQuantity />
      <NonMessage />
      <WidthGraphs />
      <MessageStreak />
      <ColdStreak />

      <footer>
        {" "}
        <p>Desenvolvido por</p>
        <a href="https://github.com/luiz2f/">luiz2f</a>
      </footer>
    </>
  );
}

export default DataPages;
