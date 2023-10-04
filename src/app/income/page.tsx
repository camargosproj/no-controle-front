import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import SidePanel from "../../components/widget/SidePanel";
import { default as apiClientInstance } from "../../services/api-client/api";
import { parseServerCookies } from "../../services/util/server-side-utils";
import { ServerSideProps } from "../../types";
import { Income } from "./types.incomes";

async function getIncomes(query) {
    const cookieData = parseServerCookies();
    const apiClient = apiClientInstance(cookieData);
    const { data } = await apiClient.get("/income", {
        params: query,
    });

    const incomes = data.data.map((income: Income) => {
        return {
            ...income,
            date: new Date(income.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
            link: `/income/${income.id}`,
        };
    });
    return {
        incomes,
        balance: data.balance,
    };
}

const Income = async (props: ServerSideProps) => {
    const { balance, incomes } = await getIncomes(props.searchParams);
    return (
        <div className="flex p-4 gap-2 flex-col sm:flex-row">
            <SidePanel {...balance} />

            <div className={"flex flex-1 flex-col gap-3 text-xs sm:text-base"}>
                <TableHead />
                {incomes &&
                    incomes.map((income, index) => (
                        <TableItem type="income" key={index} data={income} />
                    ))}
            </div>
        </div>
    );
};

export default Income;
