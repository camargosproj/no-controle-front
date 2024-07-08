"use client";
import { Expense } from "@/app/expense/types.expenses";
import { Income } from "@/app/income/types.incomes";
import EditWidget from "@/components/widget/EditWidget";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import apiClientInstance from "../../../services/api-client/api";
import { parseCookie } from "../../../services/util";
import styles from "./widget.module.css";

export type TableItemProps = {
  data: Expense & Income;
  type: "income" | "expense";
};

export type MenuOptionsProps = {
  handlePayment: () => void;
  handleDelete: () => void;
} & TableItemProps;

const TableItem = ({ data, type }: TableItemProps) => {
  const cookies = parseCookie();
  const apiClient = apiClientInstance(cookies);
  const router = useRouter();
  let isPaid = data?.paidAt || data?.receivedAt;

  const handlePayment = async () => {
    try {
      let requestData = {};

      if (type === "income") {
        requestData = {
          receivedAt: data.receivedAt ? null : new Date(),
        };
      } else if (type === "expense") {
        requestData = {
          paidAt: data.paidAt ? null : new Date(),
        };
      }

      await apiClient.patch(`/${type}/${data.id}`, requestData);
      router.refresh();
    } catch (error) {
      toast(error?.response?.data?.message || "Algo deu errado", {
        type: "error",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/${type}/${data.id}`);
      router.refresh();
    } catch (error) {
      toast(error?.response?.data?.message || "Algo deu errado", {
        type: "error",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div
      className={`grid grid-cols-5 px-2 sm:px-10 py-6 rounded-md h-16 shadow-md  items-center content-center ${
        isPaid && "bg-gray-100"
      }`}
    >
      <span className={styles.title}>{data.description}</span>
      <span className={styles.counter}>
        {new Date(data.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
      </span>
      <span className={styles.title}>{data?.category.name}</span>
      <span className={styles.counter}>
        {Number(data.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
      <div className={`flex items-center  sm:text-3xl cursor-pointer text-2xl`}>
        <MenuOptions
          handlePayment={handlePayment}
          handleDelete={handleDelete}
          data={data}
          type={type}
        />
      </div>
    </div>
  );
};
export default TableItem;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function MenuOptions({
  handlePayment,
  handleDelete,
  data,
  type,
}: MenuOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
      >
        Alterar
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          {/* <EditIcon /> */}
          <EditWidget data={data} type={type} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          disableRipple
        >
          {/* <EditIcon /> */}
          Excluir
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePayment();
            handleClose();
          }}
          disableRipple
        >
          {/* <FileCopyIcon /> */}
          Feito
        </MenuItem>
        <MenuItem disableRipple>
          {/* <FileCopyIcon /> */}
          Duplicar
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
