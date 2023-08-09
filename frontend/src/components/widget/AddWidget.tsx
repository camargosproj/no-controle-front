import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Styles
import { useRouter } from "next/router";
import api from "../../services/api-client/api";

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

const AddWidget = () => {
    const [categories, setCategories] = useState<any>([]);
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {

        const { data: transaction } = await api.post('/expense', {
            ...data,
            amount: parseFloat(data.amount),
            date: value,
        })
        handleClose();
        router.push('/expenses');

    };

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(null);


    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const getCategories = async () => {
        const { data: categories } = await api.get('/category');



        setCategories(categories);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getCategories();
    }, [])
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
                            <InputLabel htmlFor="standard-adornment-amount">Decrição</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                {...register("description")}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Valor</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                {...register("amount")}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Data"
                                    value={value}
                                    {...register("date")}
                                    onChange={(newValue) => {
                                        const date = newValue?.format('YYYY-MM-DD');
                                        setValue(date);
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
                                {...register("categoryId")}
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
                            <Button type="submit" variant="contained">Adicionar</Button>
                        </Box>
                    </form>
                </Box>

            </Modal>
        </div>
    );
};

export default AddWidget;
