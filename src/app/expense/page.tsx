import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import SidePanel from "../../components/widget/SidePanel";
import { default as apiClientInstance } from "../../services/api-client/api";
import { parseServerCookies } from "../../services/util/server-side-utils";
import { ServerSideProps } from "../../types";
import { Expense } from "./types.expenses";



async function getExpenses(query: ServerSideProps) {
    const cookieData = parseServerCookies();
    const apiClient = apiClientInstance(cookieData);
    const { data } = await apiClient.get("/expense", {
        params: query,
    });

    const expenses = data.data.map((expense: Expense) => {
        return {
            ...expense,
            date: new Date(expense.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
            link: `/expense/${expense.id}`,
        };
    });
    return {
        expenses,
        balance: data.balance,
    };
}

const Expense = async (props: ServerSideProps) => {
    const { balance, expenses } = await getExpenses(props.searchParams);
    return (
        <div className="flex p-4 gap-2 flex-col sm:flex-row">
            <SidePanel {...balance} />
            <div className={"flex flex-1 flex-col gap-3  text-xs sm:text-base"}>
                <TableHead />
                {expenses.map((expense: Expense, index: number) => (
                    <TableItem type="expense" key={index} data={expense} />
                ))}
            </div>
            {/* <BasicTable /> */}
        </div>
    );
};

export default Expense;
