import Link from "next/link";
import styles from "../../widget/widget.module.css";

const TableItem = ({ data }: any) => {


    return (


        <div className="grid grid-cols-5 px-10 py-6 rounded-md h-16 shadow-md  items-center content-center">
            {/* <div className=''> */}
            <span className={styles.title}>{data.description}</span>
            <span className={styles.counter}>{data.date}</span>
            {/* <span className={styles.counter}>{new Date(data.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            })}</span> */}
            {/* <span className={styles.counter}>{data.date}</span> */}

            <span className={styles.title}>Test</span>
            {/* </div> */}
            <span className={styles.counter}>
                {Number(data.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </span>
            <Link href={(data.link as string) || "#"}>
                <span className={styles.link}>Ver mais</span>
            </Link>
        </div>
    )
}
    ;

export default TableItem;
