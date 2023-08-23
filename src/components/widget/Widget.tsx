
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { BiWalletAlt } from "react-icons/bi";
import { MdPaid } from "react-icons/md";
import { createQueryString } from "../../services/util";

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
    const query = useSearchParams();

    let querySearch;

    const month = query.get('month');
    const year = query.get('year');

    if (month && year) {
        querySearch = {
            month,
            year
        }
    }

    const url = createQueryString(querySearch);



    const { push } = useRouter();
    switch (type) {
        case "income":
            data = {
                ...data,
                link: `/income?${url}`,
                icon: (
                    <MdPaid className={`text-primary text-6xl md:text-3xl`} />
                ),
            };
            break;
        case "expense":
            data = {
                ...data,
                link: `/expense?${url}`,
                icon: (
                    <MdPaid className={`text-primary text-6xl md:text-3xl`} />
                ),
            };
            break;
        case "balance":
            data = {
                ...data,
                link: "/balance",
                icon: (
                    <BiWalletAlt className={`text-primary text-6xl md:text-3xl`} />

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
                    {/* <KeyboardArrowDown /> */}
                    20%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
