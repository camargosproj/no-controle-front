import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BiWalletAlt } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdPaid } from "react-icons/md";
import { createQueryString } from "../../services/util";

type WidgetData = {
  type: "income" | "expense" | "balance" | "paid";
  data: {
    description: string;
    amount: number;
    link?: string;
    icon?: JSX.Element;
  };
  isClickable?: boolean;
};

const Widget = ({ type, data, isClickable = true }: WidgetData) => {
  const pathname = usePathname();
  const query = useSearchParams();

  let querySearch;

  const month = query.get("month");
  const year = query.get("year");

  if (month && year) {
    querySearch = {
      month,
      year,
    };
  }

  const url = createQueryString(querySearch);

  const { push } = useRouter();
  switch (type) {
    case "income":
      data = {
        ...data,
        link: `/income?${url}`,
        icon: <MdPaid className={`text-primary text-6xl md:text-3xl`} />,
      };
      break;
    case "expense":
      data = {
        ...data,
        link: `/expense?${url}`,
        icon: <MdPaid className={`text-primary text-6xl md:text-3xl`} />,
      };
      break;
    case "balance":
      data = {
        ...data,
        link: "/balance",
        icon: <BiWalletAlt className={`text-primary text-6xl md:text-3xl`} />,
      };
      break;
    case "paid":
      data = {
        ...data,
        link: "/paid",
        icon: (
          <IoCheckmarkDoneCircleOutline
            className={`text-primary text-6xl md:text-3xl`}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex shadow-md ${
        isClickable && "hover:bg-secondary"
      }   rounded-md justify-between p-4 w-full ${
        type === pathname.replace("/", "") ? "bg-secondary" : "cursor-pointer"
      }`}
      onClick={() => (isClickable ? push(data.link) : null)}
    >
      <div className={`flex justify-between flex-col text-primary`}>
        <span>{data.description}</span>
        <span
          className={`${
            data.amount?.toString().startsWith("-")
              ? "text-red-600"
              : "text-green-500"
          }`}
        >
          {Number(data.amount || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className={`flex flex-col justify-center gap-2`}>{data.icon}</div>
    </div>
  );
};

export default Widget;
