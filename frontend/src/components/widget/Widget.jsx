import {Link} from "react-router-dom";


// Styles
import "./Widget.scss";

// Third-party libraries
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";


const Widget = ({type}) => {
    let data;

    switch(type) {
        case "rendimentos":
            data  = {
                title:"Rendimentos",
                link: "/rendimentos",
                total: "R$ 2.000,00",
                icon: (<MonetizationOnOutlinedIcon 
                    className="icon"
                    style={{
                        color: "white",
                    }}
                />),
            };
            break;
        case "despesas":
            data = {
                title:"Despesas",
                link: "/despesas",
                total: "R$ 1.000,00",
                icon: (<MonetizationOnOutlinedIcon 
                    className="icon"
                    style={{
                        color: "white",
                    }}
                />),
            };
            break;
        case "saldo":
            data = {
                title:"Saldo",
                link:"/saldo",
                total: "R$ 1.000,00",
                icon: (<AccountBalanceWalletOutlinedIcon
                    className="icon"
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
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.total}</span>
                <Link to={data.link}>
                    <span className="link">Ver mais</span>
                </Link>
            </div>
            <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20%
            </div>
            {data.icon}
            </div>
        </div>
     );
}
 
export default Widget;