import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import SidePanel from "../../components/widget/SidePanel";
import { default as apiClientInstance } from "../../services/api-client/api";
import { COOKIE_KEY } from "../../services/config";
import { ServerSideProps } from "../../types";
import { Income } from "./types.incomes";

async function getIncomes(query) {
    const getCookie = cookies();

    const cookie = getCookie.get(COOKIE_KEY)?.value;
    if (!cookie) {
        redirect("/login");
    }
    const cookieData = JSON.parse(cookie);
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
        <div className="flex p-4 gap-2">
            <SidePanel {...balance} />

            <div className={"flex flex-1 flex-col gap-3"}>
                <TableHead />
                {incomes &&
                    incomes.map((income, index) => (
                        <TableItem key={index} data={income} />
                    ))}
            </div>
        </div>
    );
};

export default Income;
