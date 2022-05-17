// Styles
import './Featured.scss';

//Third-party libraries
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";



const Featured = () => {
    return ( 
        <div className="featured">
            <div className="top">
                <h1 className="title">Média Anual</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
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