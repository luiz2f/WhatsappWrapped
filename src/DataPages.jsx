import AudioQuantity from "./dataPages/AudioQuantity";
import ColdStreak from "./dataPages/ColdStreak";
import ImageQuantity from "./dataPages/ImageVideoQuantity";
import MessagePerDay from "./dataPages/MessagePerDay";
import MessagePerHour from "./dataPages/MessagePerHour";
import MessagePerYear from "./dataPages/MessagePerYear";
import MessageQuantity from "./dataPages/MessageQuantity";
import MessageStreak from "./dataPages/MessageStreak";
import MostSendMessages from "./dataPages/MostSendMessages";
import MostSendWords from "./dataPages/MostSendWords";
import StickerQuantity from "./dataPages/StickerQuantity";

function DataPages() {
  return (
    <>
      <MessageQuantity />
      {/* <MostSendWords /> */}
      {/* <MostSendMessages /> */}
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
