import { BarChart } from "@mui/x-charts";
import { SummaryResponse } from "../../app/home/home.type";

const data = [
  { name: "Janeiro", Total: 1200 },
  { name: "Fevereiro", Total: 2100 },
  { name: "Março", Total: 800 },
  { name: "Abril", Total: 1600 },
  { name: "Maio", Total: 900 },
  { name: "Junho", Total: 1700 },
  { name: "Julho", Total: 1300 },
  { name: "Agosto", Total: 1300 },
  { name: "Setembro", Total: 1500 },
  { name: "Outubro", Total: 2000 },
  { name: "Novembro", Total: 2700 },
  { name: "Dezembro", Total: 1100 },
];

export default function SimpleCharts({ year }: Partial<SummaryResponse>) {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: year.map((d) => d.month),
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: year.map((d) => d.expenseTotal),
          label: "Despesas",
          color: "red",
        },
        {
          data: year.map((d) => d.incomeTotal),
          label: "Receitas",
          color: "green",

        },
        {
          data: year.map((d) => d.balance),
          label: "Saldo",
          color: "#15637b",

        },
      ]}
      className={`text-primary bg-primary`}
      colors={["#15637b"]}

      width={800}
      height={500}
    />
  );
}
