"use client";
import { Expense } from "@/app/expense/types.expenses";
import { Income } from "@/app/income/types.incomes";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apiClientInstance from "../../services/api-client/api";
import { parseCookie } from "../../services/util";
import Loading from "../loading/Loading";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid var(--font-color)",
  boxShadow: 24,
  p: 4,
};

const categoryType = {
  income: "Receitas",
  expense: "Despesas",
};

type EditWidgetProps = {
  data: Expense & Income;
  type: "income" | "expense";
};

type FormValues = {
  id: string;
  description: string;
  amount: string;
  date: string;
  category: string;
};

const EditWidget = ({ type, data }: EditWidgetProps) => {
  const [categories, setCategories] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(() => {
    let date = dayjs(data.date);

    const localOffset = date.utcOffset() * 60 * 1000;

    date = date.subtract(localOffset, "millisecond");

    return date;
  });
  const cookies = parseCookie();
  const apiClient = apiClientInstance(cookies);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: {
      id: data.id,
      description: data.description,
      amount: data.amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      date: data.date,
      categoryId: data.categoryId,
    },
  });
  const onSubmit = async (data: FormValues) => {
    try {
      // remove non-numeric characters from the input and corvert it to a decimal number
      const convertedAmount = parseFloat(data.amount.replace(/\D/g, "")) / 100;

      await apiClient.patch(`/${type}/${data.id}`, {
        ...data,
        date: date?.format("YYYY-MM-DD"),
        amount: convertedAmount,
      });
      startTransition(() => {
        handleClose();
        router.refresh();
      });
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "Algo deu errado", {
        type: "error",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const getCategories = async () => {
    try {
      const { data: categories } = await apiClient.get("/category", {
        params: {
          type: categoryType[type],
        },
      });
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters from the input
    const rawValue = e.target.value.replace(/\D/g, "");

    // Convert to a number
    const numericValue = parseFloat(rawValue) / 100; // Assuming input is in cents

    if (isNaN(numericValue)) {
      setValue("amount", "");
      return;
    }

    // Format as currency (Real)
    const formattedCurrency = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValue("amount", formattedCurrency);
  };

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getCategories();
      return;
    }
  }, [type]);
  return (
    <div className="w-full">
      <p onClick={handleOpen}>Editar</p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isPending ? (
          <Loading />
        ) : (
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Descrição
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                  {...register("description", {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Valor
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  placeholder="R$ 0,00"
                  {...register("amount", {
                    required: true,
                    onChange: handleCurrencyChange,
                  })}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <LocalizationProvider
                  adapterLocale={"pt-br"}
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    label="Data de vencimento"
                    value={date}
                    {...register("date", {
                      required: true,
                    })}
                    onChange={(newValue: Dayjs) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Categoria
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue={data.categoryId}
                  label="Categoria"
                  {...register("categoryId", {
                    required: true,
                  })}
                >
                  <MenuItem value="">
                    <em>Escolha uma categoria</em>
                  </MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  className="bg-primary "
                  variant="contained"
                  disabled={formState.isSubmitting || isPending}
                >
                  Adicionar
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default EditWidget;
