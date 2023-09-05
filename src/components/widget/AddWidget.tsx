"use client";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
// import { apiClient } from "../../services/api-client/apiClient";
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

type AddWidgetProps = {
    type: "income" | "expense";
};

type FormValues = {
    description: string;
    amount: string;
    date: string;
    category: string;
};


const AddWidget = ({ type }: AddWidgetProps) => {
    const [categories, setCategories] = useState<any>([]);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const cookies = parseCookie();
    const apiClient = apiClientInstance(cookies);
    const query = useSearchParams();
    const router = useRouter();
    const month = query.get("month");
    const year = query.get("year");



    const { register, handleSubmit, reset, setValue, formState } = useForm();
    const onSubmit = async (data: FormValues) => {
        try {
            await apiClient.post(`/${type}`, {
                ...data,
                date,
                amount: parseFloat(data.amount),
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
        handleChangeDate();
    };

    const handleChangeDate = () => {
        if (month && year) {
            setDate(dayjs(`${month}-${year}`));
        } else {
            setDate(dayjs());
        }
    };

    useEffect(() => {
        handleChangeDate();
    }, [month, year]);

    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            getCategories();
            return;
        }
    }, [type]);
    return (
        <div className="bg-slate-50  rounded-md shadow-md cursor-pointer text-primary h-16 w-full flex justify-center content-center flex-wrap">
            <IoMdAddCircleOutline
                className="p-2 text-4xl w-full h-full text-primary"
                onClick={handleOpen}
            />
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
                                    startAdornment={
                                        <InputAdornment position="start">$</InputAdornment>
                                    }
                                    {...register("amount", {
                                        required: true,
                                    })}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <LocalizationProvider
                                    adapterLocale={"pt-br"}
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Data"
                                        value={date}
                                        {...register("date", {
                                            required: true,
                                        })}
                                        onChange={(newValue: Dayjs) => {
                                            setDate(newValue);
                                            setValue("date", newValue);
                                        }}
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
                                    defaultValue={""}
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

export default AddWidget;
