"use client"
import { usePathname } from "next/navigation"
import Filter from "../filter/Filter"
import AddWidget from "./AddWidget"
import Widget from "./Widget"

type SidePanelProps = {
    totalExpense: number,
    totalIncome: number,
    totalBalance: number,
    receivedIncomes: number,
    paidExpenses: number

}

const SidePanel = ({ totalBalance, totalExpense, totalIncome, paidExpenses, receivedIncomes }: SidePanelProps) => {
    const pathname = usePathname();
    return (
        <div className="min-w-[8.25rem]  sm:min-w-[11.25rem] sm:max-w-[13%] gap-4 flex flex-col">
            <AddWidget type={pathname.replace('/', '') as "income" | "expense"} />
            <Filter />
            <Widget type="expense" data={{ description: 'Despesas', amount: totalExpense }} />
            <Widget type="income" data={{ description: 'Rendimentos', amount: totalIncome }} />
            <Widget type="paid" data={{ description: 'Pago', amount: paidExpenses }} isClickable={false} />
            <Widget type="balance" data={{ description: 'Saldo', amount: totalBalance }} isClickable={false} />
        </div>
    )
}

export default SidePanel