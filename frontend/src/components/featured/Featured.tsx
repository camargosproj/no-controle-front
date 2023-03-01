// Styles
import styles from "./featured.module.css";


//Third-party libraries
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";



const Featured = () => {
    return (
        <div className={styles.featured}>
            <div className={styles.top}>
                <h1 className={styles.title}>Média Anual</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className={styles.bottom}>
                <div className={styles.featuredChart}>
                    <CircularProgressbar
                        value={70}
                        text={"70%"}
                        strokeWidth={8}
                        styles={buildStyles({
                            pathColor: "var(--font-color)",
                        })}
                    />
                </div>
            </div>
        </div>
    );
}

export default Featured;