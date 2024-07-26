// import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod.js";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useMessagePerPeriod from "../hooks/dataPages/useMessagePerPeriod";

function MessagePerYear() {
  const { data } = useMessagePerPeriod();
  const { year } = data || {};

  return (
    <section>
      <div>
        <h1>Mensagens por ano</h1>
        <div>
          {year ? (
            <BarChart width={900} height={400} data={year}>
              <CartesianGrid />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />

              {Object.entries(year[0])
                .filter(([key]) => key !== "x") // Filter out the key 'x'
                .map(([key]) => (
                  <Bar
                    key={`key-${key}`}
                    dataKey={key}
                    stackId="a"
                    fill={key === "Luy" ? "#8884d8" : "#3a8055"}
                  />
                ))}
            </BarChart>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default MessagePerYear;
