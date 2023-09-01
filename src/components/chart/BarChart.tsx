import { BarChart } from "@mui/x-charts";
import { SummaryResponse } from "../../app/home/home.type";
import { MonthMap } from "../filter/Filter";

export default function SimpleCharts({ year }: Partial<SummaryResponse>) {
  const reversedMonthMap = {};
  for (const key in MonthMap) {
    reversedMonthMap[MonthMap[key]] = key;
  }

  // Create an array of 12 months to add data from the year to the graph
  const months = Object.values(MonthMap).map((month) => {
    const monthData = year.find((item) => item.month === month.toUpperCase());
    return {
      month: reversedMonthMap[month].toUpperCase().slice(0, 3),
      expenseTotal: monthData?.expenseTotal || 0,
      incomeTotal: monthData?.incomeTotal || 0,
      balance: monthData?.balance || 0,
    };
  });

  return (
    <>
      {months?.length ? (


        <div className={`w-full h-[80%]`}>

          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: months.map(({ month }) => month),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: months.map(({ expenseTotal }) => expenseTotal),
                label: "Despesas",
                color: "red",
              },
              {
                data: months.map(({ incomeTotal }) => incomeTotal),
                label: "Receitas",
                color: "green",
              },
              {
                data: months.map(({ balance }) => balance),
                label: "Saldo",
                color: "#15637b",
              },
            ]}
            className={`text-primary bg-primary`}
            colors={["#15637b"]}
          />
        </div>
      ) : null}
    </>
  );
}
