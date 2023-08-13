import { useRouter } from "next/router"
import Filter from "../filter/Filter"
import AddWidget from "./AddWidget"
import Widget from "./Widget"

type SidePanelProps = {
    totalExpense: number,
    totalIncome: number,
    totalBalance: number

}

const SidePanel = ({ totalBalance, totalExpense, totalIncome }: SidePanelProps) => {
    const { pathname } = useRouter();
    return (
        <div className="w-1/3 sm:min-w-[10%] sm:max-w-[13%] gap-4 flex flex-col">
            <AddWidget type={pathname.replace('/', '') as "income" | "expense"} />
            <Filter />
            <Widget type="despesas" data={{ description: 'Despesas', amount: totalExpense }} />
            <Widget type="rendimentos" data={{ description: 'Rendimentos', amount: totalIncome }} />
            <Widget type="saldo" data={{ description: 'Saldo', amount: totalBalance }} />
        </div>
    )
}

export default SidePanel