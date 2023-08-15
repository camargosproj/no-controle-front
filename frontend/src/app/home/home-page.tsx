'use client'
import Chart from "../../components/chart/Chart";
import Widget from "../../components/widget/Widget";
import { SummaryResponse } from "./home.type";






const HomePage = ({ balance }: SummaryResponse) => {
    return (
        <div className={`flex pr-3 pl-3`}>
            <div className={`flex flex-col w-full`}>
                <div className={`flex gap-6 p-2 w-full`}>
                    <Widget type="rendimentos" data={{ description: 'Rendimentos', amount: balance.totalIncome }} />
                    <Widget type="despesas" data={{ description: 'Despesas', amount: balance.totalExpense }} />
                    <Widget type="saldo" data={{ description: 'Saldo', amount: balance.totalBalance }} />
                </div>

                <div className={`flex`}>
                    {/* <Featured /> */}
                    <Chart title="Receita Anual" aspect={2 / 1} />
                    <Chart title="Despesas Anual" aspect={2 / 1} />
                </div>
            </div>
        </div >
    );
}



export default HomePage;