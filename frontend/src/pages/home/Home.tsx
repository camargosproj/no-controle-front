import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Widget from "../../components/widget/Widget";

import styles from './home.module.css';




const HomePage = ({ balance }: SummaryResponse) => {
    return (
        <div className={styles.home}>
            <div className={styles.homeContainer}>
                <div className={styles.widgets}>
                    <Widget type="rendimentos" data={{ description: 'Rendimentos', amount: balance.totalIncome }} />
                    <Widget type="despesas" data={{ description: 'Despesas', amount: balance.totalExpense }} />
                    <Widget type="saldo" data={{ description: 'Saldo', amount: balance.totalBalance }} />
                </div>

                <div className={styles.charts}>
                    <Featured />
                    <Chart title="Receita Anual" aspect={2 / 1} />
                </div>
            </div>
        </div >
    );
}



export default HomePage;