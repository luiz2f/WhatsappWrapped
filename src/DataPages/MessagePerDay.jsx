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
function MessagePerDay() {
  const { data } = useMessagePerPeriod();
  const { day } = data || {};

  return (
    <section>
      <div>
        <h1>Mensagens por dia da semana</h1>
        {day ? (
          <BarChart width={900} height={400} data={day}>
            <CartesianGrid />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />

            {Object.entries(day[0])
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
        <div></div>
      </div>
    </section>
  );
}

export default MessagePerDay;
