import { lazy, Suspense } from "react";
import useData from "./context/useData";
import MessageQuantity from "./dataPages/MessageQuantity";
import Spinner from "./ui/Spinner";
const NonMessage = lazy(() => import("./dataPages/NonMessage"));
const WidthGraphs = lazy(() => import("./dataPages/WidthGraphs"));
const MessageStreak = lazy(() => import("./dataPages/MessageStreak"));
const ColdStreak = lazy(() => import("./dataPages/ColdStreak"));

function DataPages() {
  const { messageQuantity, nonMessage, graphData, messageStreak, coldStreak } =
    useData();

  return (
    <>
      {messageQuantity && <MessageQuantity messageQuantity={messageQuantity} />}
      <Suspense fallback={<Spinner />}>
        {nonMessage && <NonMessage nonMessage={nonMessage} />}
        {graphData && <WidthGraphs graphData={graphData} />}
        {messageStreak && <MessageStreak messageStreak={messageStreak} />}
        {coldStreak && <ColdStreak coldStreak={coldStreak} />}
      </Suspense>
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
