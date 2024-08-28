import useData from "./context/useData";
import ColdStreak from "./dataPages/ColdStreak";
import MessageQuantity from "./dataPages/MessageQuantity";
import MessageStreak from "./dataPages/MessageStreak";
import WidthGraphs from "./dataPages/WidthGraphs";
import NonMessage from "./dataPages/NonMessage";

function DataPages() {
  const { messageQuantity, nonMessage, graphData, messageStreak, coldStreak } =
    useData();

  return (
    <>
      {messageQuantity && <MessageQuantity messageQuantity={messageQuantity} />}
      {nonMessage && <NonMessage nonMessage={nonMessage} />}
      {graphData && <WidthGraphs graphData={graphData} />}
      {messageStreak && <MessageStreak messageStreak={messageStreak} />}
      {coldStreak && <ColdStreak coldStreak={coldStreak} />}

      <footer>
        {" "}
        {nonMessage && (
          <>
            <p>Desenvolvido por</p>
            <a
              href="https://github.com/luiz2f/"
              target="_blank"
              rel="noreferrer"
            >
              luiz2f
            </a>
          </>
        )}
      </footer>
    </>
  );
}

export default DataPages;
