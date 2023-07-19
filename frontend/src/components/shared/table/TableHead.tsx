import styles from "../../widget/widget.module.css";
const TableHead = () => (
    <div className={styles.widgetsTable}>
        {/* <AddWidget /> */}
        <div className="bg-slate-50  grid grid-cols-5 px-10 py-6 rounded-lg h-16 items-center font-semibold shadow-md content-center" >
            <h1>Descrição</h1>
            <h1>Data</h1>
            <h1>Categoria</h1>
            <h1>Valor</h1>
            <h1>Ver Mais</h1>
        </div>
    </div>
)

export default TableHead;




