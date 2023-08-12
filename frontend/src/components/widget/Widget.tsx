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
                    className={`text-primary text-4xl self-end`}
                />),
            };
            break;
        case "despesas":
            data = {
                ...data,
                link: "/expense",
                icon: (<MonetizationOnOutlined
                    className={` text-primary text-4xl self-end`}
                />),
            };
            break;
        case "saldo":
            data = {
                ...data,
                link: "/saldo",
                icon: (<AccountBalanceWalletOutlined
                    className={`text-primary text-4xl self-end `}
                />),
            };
            break;
        default:
            break;
    }

    return (

        <div className={`flex shadow-md rounded-md justify-between p-4`}>
            <div className={`flex justify-between flex-col`}>
                <span >{data.description}</span>
                <span >{Number(data.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                <Link href={data.link as string}>
                    <span>Ver mais</span>
                </Link>
            </div>
            <div className={`flex flex-col gap-2`}>
                <div className={`text-green-500`}>
                    <KeyboardArrowDown />
                    20%
                </div>
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;

