import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import AddWidget from "../../components/widget/AddWidget";
import Widget from "../../components/widget/Widget";
import api from "../../services/api-client/api";
import { ExpensesResponse } from "./types.expenses";

const Expense = ({ expenses }: ExpensesResponse) => {
    return (
        <div className="flex p-4 gap-2">
            <div className="w-1/4 sm:w-[10%] gap-4 flex flex-col">
                <AddWidget />
                <Widget type="despesas" data={{ description: 'Despesas', amount: '5000' }} />
                <Widget type="saldo" data={{ description: 'Saldo', amount: '5000' }} />

            </div>
            <div className={'flex flex-1 flex-col gap-3'}>
                <TableHead />
                {expenses.map((expense, index) => (
                    <TableItem key={index} data={expense} />
                ))}
            </div>
        </div>

    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const { data } = await api.get('/expense');

    const expenses = data.map((expense) => {
        return {
            ...expense,
            date: new Date(expense.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
            link: `/expenses/${expense.id}`,
        };
    })

    // Pass data to the page via props
    return { props: { expenses } };
}

export default Expense;
