import TableHead from "../../components/shared/table/TableHead";
import TableItem from "../../components/shared/table/TableItem";
import AddWidget from "../../components/widget/AddWidget";
import Widget from "../../components/widget/Widget";
import api from "../../services/api-client/api";
import { Income, IncomeResponse } from "./types.incomes";

const Income = ({ incomes, balance }: IncomeResponse) => {
    return (
        <div className="flex p-4 gap-2">
            <div className="w-1/4 sm:w-[10%] gap-4 flex flex-col">
                <AddWidget type='income' />
                <Widget type="despesas" data={{ description: 'Despesas', amount: balance.totalExpense }} />
                <Widget type="rendimentos" data={{ description: 'Rendimentos', amount: balance.totalIncome }} />
                <Widget type="saldo" data={{ description: 'Saldo', amount: balance.totalBalance }} />
            </div>
            <div className={'flex flex-1 flex-col gap-3'}>
                <TableHead />
                {incomes && incomes.map((income, index) => (
                    <TableItem key={index} data={income} />
                ))}
            </div>
        </div>

    );
};

// This gets called on every request
export async function getServerSideProps(ctx: any) {
    try {
        const cookie = ctx.req.headers.cookie;
        if (!cookie) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
        // Fetch data from external API
        const apiClient = api(ctx);
        const { data, status } = await apiClient.get('/income')


        if (status !== 200) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
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
        })

        // Pass data to the page via props
        return { props: { incomes, balance: data.balance } };

    } catch (error) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }







}

export default Income;
