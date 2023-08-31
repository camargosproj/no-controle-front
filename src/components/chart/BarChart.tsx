import { BarChart } from "@mui/x-charts";
import { SummaryResponse } from "../../app/home/home.type";



export default function SimpleCharts({ year }: Partial<SummaryResponse>) {
  return (
    <>
      {year?.length ? <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: year.map(({ month }) => month),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: year.map(({ expenseTotal }) => expenseTotal),
            label: "Despesas",
            color: "red",
          },
          {
            data: year.map(({ incomeTotal }) => incomeTotal),
            label: "Receitas",
            color: "green",

          },
          {
            data: year.map(({ balance }) => balance),
            label: "Saldo",
            color: "#15637b",

          },
        ]}
        className={`text-primary bg-primary`}
        colors={["#15637b"]}

        width={800}
        height={500}
      /> : null}
    </>
  );
}
