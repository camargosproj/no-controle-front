import Widget from "../../components/widget/Widget";
import { IncomeResponse } from "./types.incomes";
import styles from "./incomes.module.css";
import AddWidget from "../../components/widget/AddWidget";
import api from "../../services/api-client/api";

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
    const { data: incomes } = await api.get('/incomes');

    // Pass data to the page via props
    return { props: { incomes } };
}

export default Incomes;
