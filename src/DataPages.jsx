import AudioQuantity from "./DataPages/AudioQuantity";
import ColdStreak from "./DataPages/ColdStreak";
import ImageQuantity from "./DataPages/ImageVideoQuantity";
import MessagePerDay from "./DataPages/MessagePerDay";
import MessagePerHour from "./DataPages/MessagePerHour";
import MessagePerYear from "./DataPages/MessagePerYear";
import MessageQuantity from "./DataPages/MessageQuantity";
import MessageStreak from "./DataPages/MessageStreak";
import MostSendMessages from "./DataPages/MostSendMessages";
import MostSendWords from "./DataPages/MostSendWords";
import StickerQuantity from "./DataPages/StickerQuantity";

function DataPages() {
  return (
    <>
      <MessageQuantity />
      <MostSendWords />
      <MostSendMessages />
      <AudioQuantity />
      <StickerQuantity />
      <ImageQuantity />
      <MessagePerYear />
      {/* <MessagePerSeason /> */}
      <MessagePerDay />
      <MessagePerHour />
      <MessageStreak />
      <ColdStreak />
    </>
  );
}

export default DataPages;
