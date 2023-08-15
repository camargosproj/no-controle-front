import {
    AccountBalanceWalletOutlined,
    KeyboardArrowDown,
    MonetizationOnOutlined,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

type WidgetData = {
    type: 'income' | 'expense' | 'balance';
    data: {
        description: string;
        amount: number;
        link?: string;
        icon?: JSX.Element;
    };
};

const Widget = ({ type, data }: WidgetData) => {
    const pathname = usePathname();
    const { push } = useRouter();
    switch (type) {
        case "income":
            data = {
                ...data,
                link: "/income",
                icon: (
                    <MonetizationOnOutlined
                        className={`text-primary text-4xl self-end`}
                    />
                ),
            };
            break;
        case "expense":
            data = {
                ...data,
                link: "/expense",
                icon: (
                    <MonetizationOnOutlined
                        className={` text-primary text-4xl self-end`}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                ...data,
                link: "/balance",
                icon: (
                    <AccountBalanceWalletOutlined
                        className={`text-primary text-4xl self-end `}
                    />
                ),
            };
            break;
        default:
            break;
    }


    return (
        <div
            className={`flex shadow-md hover:bg-secondary  rounded-md justify-between p-4 w-full ${type === pathname.replace("/", "") ? "bg-secondary" : "cursor-pointer"
                }`}
            onClick={() => push(data.link)}
        >
            <div className={`flex justify-between flex-col`}>
                <span>{data.description}</span>
                <span>
                    {Number(data.amount).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </span>
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
};

export default Widget;
