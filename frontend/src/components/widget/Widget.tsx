
// Styles
import styles from "./widget.module.css";

// Third-party libraries
import { AccountBalanceWalletOutlined, KeyboardArrowDown, MonetizationOnOutlined } from "@mui/icons-material";

import Link from "next/link";

type WidgetData = {
    type: string,
    data: {
        description: string,
        amount: number,
        link?: string,
        icon?: JSX.Element
    }
}


const Widget = ({ type, data }: WidgetData) => {
    switch (type) {
        case "rendimentos":
            data = {
                ...data,
                link: "/income",
                icon: (<MonetizationOnOutlined
                    className={styles.icon}
                    style={{
                        color: "white",
                    }}
                />),
            };
            break;
        case "despesas":
            data = {
                ...data,
                link: "/expense",
                icon: (<MonetizationOnOutlined
                    className={styles.icon}
                    style={{
                        color: "white",
                    }}
                />),
            };
            break;
        case "saldo":
            data = {
                ...data,
                link: "/saldo",
                icon: (<AccountBalanceWalletOutlined
                    className={styles.icon}
                    style={{
                        color: "white",
                    }}
                />),
            };
            break;
        default:
            break;
    }

    return (
        <div className={styles.widget}>
            <div className={styles.left}>
                <span className={styles.title}>{data.description}</span>
                <span className={styles.counter}>{Number(data.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                <Link href={data.link as string}>
                    <span className={styles.link}>Ver mais</span>
                </Link>
            </div>
            <div className={styles.right}>
                <div className={`${styles.percentage} ${styles.positive}`}>
                    <KeyboardArrowDown />
                    20%
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;

