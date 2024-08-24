import { useEffect } from "react";
import AudioQuantity from "./dataPages/AudioQuantity";
import ColdStreak from "./dataPages/ColdStreak";
import ImageQuantity from "./dataPages/ImageVideoQuantity";
import MessageQuantity from "./dataPages/MessageQuantity";
import MessageStreak from "./dataPages/MessageStreak";
import StickerQuantity from "./dataPages/StickerQuantity";
import useUserColors from "./hooks/dataPages/useUserColors";
import WidthGraphs from "./dataPages/WidthGraphs";
import { userToClassName } from "./functions/userToClassName";

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
          return `.${userToClassName(
            key
          )} { color: var(--${value}); fill: var(--${value}); }\n :root { --${userToClassName(
            key
          )}: var(--${value}) }`;
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
      <AudioQuantity />
      <StickerQuantity />
      <ImageQuantity />
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
