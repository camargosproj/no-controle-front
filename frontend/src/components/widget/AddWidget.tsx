import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// Styles
import { useRouter } from "next/router";
import { apiClient } from "../../services/api-client/apiClient";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid var(--font-color)',
    boxShadow: 24,
    p: 4,
};

const categoryType = {
    income: 'Receitas',
    expense: 'Despesas',
}

type AddWidgetProps = {
    type: 'income' | 'expense';
}

type FormValues = {
    description: string;
    amount: string;
    date: string;
    category: string;
}

const AddWidget = ({ type }: AddWidgetProps) => {
    const [categories, setCategories] = useState<any>([]);
    const router = useRouter();

    const { register, handleSubmit, reset, setValue } = useForm();
    const onSubmit = async (data: FormValues) => {

        try {
            await apiClient.post(`/${type}`, {
                ...data,
                amount: parseFloat(data.amount),
            })
            handleClose();
            router.push(`/${type}`);

        } catch (error) {
            console.log(error);

        }


    };

    const [open, setOpen] = useState(false);

    const [date, setDate] = useState(null);

    const getCategories = async () => {
        try {
            const { data: categories } = await apiClient.get('/category', {
                params: {
                    type: categoryType[type.replace('/', '')]
                }
            });
            setCategories(categories);

        } catch (error) {
            console.log(error);
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        reset();
        setDate(null);
    };

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            getCategories();
            return;
        }
    }, [type])
    return (
        <div className="bg-slate-50 rounded-md shadow-md cursor-pointer h-16 w-full flex justify-center content-center flex-wrap">
            <AddIcon className="text-7xl text-primary" onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Descrição</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                {...register("description", {
                                    required: true,
                                })}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Valor</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                {...register("amount", {
                                    required: true,

                                })}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Data"
                                    value={date}
                                    {...register("date", {
                                        required: true,

                                    })}
                                    onChange={(newValue) => {
                                        const date = newValue?.format('YYYY-MM-DD');
                                        setDate(date);
                                        setValue('date', date);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                defaultValue={""}
                                // onChange={handleChange}
                                label="Categoria"
                                {...register("categoryId", {
                                    required: true,
                                })}
                            >
                                <MenuItem value="">
                                    <em>Escolha uma categoria</em>
                                </MenuItem>
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button type="submit" >Adicionar</Button>
                        </Box>
                    </form>
                </Box>

            </Modal>
        </div>
    );
};

export default AddWidget;
