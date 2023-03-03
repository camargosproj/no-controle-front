import Widget from "../../components/widget/Widget";
import { IncomeResponse } from "./types.incomes";
import styles from "./incomes.module.css";
import AddWidget from "../../components/widget/AddWidget";

const Incomes = ({ incomes }: IncomeResponse) => {
    return (
        <div className={styles.home}>
            <div className={styles.homeContainer}>
                <div className={styles.homeContainer}>
                    <div className={styles.widgets}>
                        <AddWidget />
                        {incomes.map((income, index) => (
                            <Widget key={index} type="rendimentos" data={income} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://backend:4000/incomes`)
    const incomes = await res.json()
    // const incomes = [
    //     {
    //         id: "1dd4c09f-0685-4481-a21c-15f47f1813ed",
    //         amount: 2100,
    //         description: "Salario Mercadão",
    //         date: "2023-05-01T03:00:00.000Z",
    //         categoryId: "564c9d59-9849-42a7-bd22-942157dd99cd",
    //         userId: "2ebf9ae2-98ec-49a3-9805-82d74a2ee90e",
    //         sharedAccountGroupId: "1c12e3e8-1c32-4ed1-b67e-60b826576ee6",
    //         accountGroupId: "12c0689c-f807-469a-ac77-5f5be28a89fd",
    //     },
    //     {
    //         id: "321af23b-6952-4893-b381-9e1017514b5f",
    //         amount: 600,
    //         description: "Cartão Alimentação CWBOX",
    //         date: "2023-01-01T03:00:00.000Z",
    //         categoryId: "564c9d59-9849-42a7-bd22-942157dd99cd",
    //         userId: "38578097-ddb8-4b02-905d-e6da94babaa2",
    //         sharedAccountGroupId: "1c12e3e8-1c32-4ed1-b67e-60b826576ee6",
    //         accountGroupId: "12c0689c-f807-469a-ac77-5f5be28a89fd",
    //     },
    //     {
    //         id: "d1fe7d54-8b79-4640-9ee2-60fe9ba819b1",
    //         amount: 2448,
    //         description: "Salário CWBOX",
    //         date: "2023-01-01T03:00:00.000Z",
    //         categoryId: "0a5412de-393a-4291-9dc3-e46ab9570d07",
    //         userId: "38578097-ddb8-4b02-905d-e6da94babaa2",
    //         sharedAccountGroupId: "1c12e3e8-1c32-4ed1-b67e-60b826576ee6",
    //         accountGroupId: "12c0689c-f807-469a-ac77-5f5be28a89fd",
    //     },
    // ];

    // Pass data to the page via props
    return { props: { incomes } };
}

export default Incomes;
