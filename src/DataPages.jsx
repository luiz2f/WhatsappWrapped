import { useEffect } from "react";
import AudioQuantity from "./dataPages/AudioQuantity";
import ColdStreak from "./dataPages/ColdStreak";
import ImageQuantity from "./dataPages/ImageVideoQuantity";
import MessagePerHour from "./dataPages/MessagePerHour";
import MessagePerYear from "./dataPages/MessagePerYear";
import MessageQuantity from "./dataPages/MessageQuantity";
import MessageStreak from "./dataPages/MessageStreak";
import StickerQuantity from "./dataPages/StickerQuantity";
import useUserColors from "./hooks/dataPages/useUserColors";
import WidthGraphs from "./dataPages/WidthGraphs";

function DataPages() {
  const { data: usersColors } = useUserColors();
  useEffect(() => {
    if (usersColors) {
      const styleId = "user-styles";

      let style = document.getElementById(styleId) || null;
      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
      }

      const cssRules = Object.entries(usersColors)
        .map(([key, value]) => {
          return `.${key} { color: var(--${value}); fill: var(--${value}); }\n :root { --${key}: var(--${value}) }`;
        })
        .join("\n");

      style.textContent = cssRules;

      return () => {
        if (style) {
          document.head.removeChild(style);
        }
      };
    }
  }, [usersColors]);

  return (
    <>
      <MessageQuantity />
      {/* <MostSendWords /> */}
      {/* <MostSendMessages /> */}
      <AudioQuantity />
      <StickerQuantity />
      <ImageQuantity />
      <WidthGraphs />
      {/* <MessagePerYear />
       <MessagePerDay /> */}
      {/* <MessagePerSeason /> */}
      <MessagePerHour />
      <MessageStreak />
      <ColdStreak />
    </>
  );
}

export default DataPages;
