'use client'
import SimpleCharts from "../../components/chart/BarChart";
import Widget from "../../components/widget/Widget";
import { SummaryResponse } from "./home.type";


const HomePage = ({ month, year }: SummaryResponse) => {
    return (
        <div className={`flex pr-3 pl-3`}>
            <div className={`flex flex-col w-full`}>
                <div className={`flex gap-6 p-2 w-full`}>
                    <Widget type="income" data={{ description: 'Rendimentos', amount: month.totalIncome }} />
                    <Widget type="expense" data={{ description: 'Despesas', amount: month.totalExpense }} />
                    <Widget type="balance" data={{ description: 'Saldo', amount: month.totalBalance }} />
                </div>

                <div className={`flex flex-col md:flex-row`}>
                    {/* <Featured /> */}
                    {/* <Chart title="Receita Anual" aspect={2 / 1} />
                    <Chart title="Despesas Anual" aspect={2 / 1} /> */}
                    <SimpleCharts year={year} />
                    {/* <SimpleCharts year={year} /> */}
                </div>
            </div>
        </div >
    );
}



export default HomePage;