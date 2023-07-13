import Widget from "../../components/widget/Widget";
import styles from "./expenses.module.css";
import AddWidget from "../../components/widget/AddWidget";
import api from "../../services/api-client/api";
import { ExpensesResponse } from "./types.expenses";

const Expense = ({ expenses }: ExpensesResponse) => {
    return (
        // <div className={styles.home}>
        //     <div className={styles.homeContainer}>
        //         <div className={styles.homeContainer}>
        //             <div className={styles.widgets}>
        //                 <AddWidget />
        //                 {expenses.map((expense, index) => (
        //                     <Widget key={index} type="despesas" data={expense} />
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className={styles.expenses}>
            <div className={styles.widgets}>
                <AddWidget />
                {expenses.map((expense, index) => (
                    <Widget key={index} type="despesas" data={expense} />
                ))}
            </div>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const { data: expenses } = await api.get('/expense');

    // Pass data to the page via props
    return { props: { expenses } };
}

export default Expense;
