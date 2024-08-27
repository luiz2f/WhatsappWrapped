import { Suspense } from "react";
import useColdStreak from "../hooks/dataPages/useColdStreak";
import Spinner from "../ui/Spinner";

function ColdStreak() {
  const { data } = useColdStreak();
  const { longestStreak, startDate, endDate } = data || 0;
  return (
    <section>
      <div>
        <h1>Maior sequência sem mensagens</h1>
        <div className="streak cold">
          <div>
            <img src="https://em-content.zobj.net/source/apple/391/ice_1f9ca.png" />
          </div>
          <div>
            <p>
              {longestStreak}
              <span>dias</span>
            </p>
            <p>é a maior sequência sem mensagens entre vocês</p>
            <p>
              ocorreu entre {startDate} e {endDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ColdStreak;
