import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Modal, ModalRoot, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Styles
import styles from "./widget.module.css";

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

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState<Dayjs | null>(null);

    console.log(value)

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className={styles.AddIconContainer}>
            <AddIcon className={styles.AddIcon} onClick={handleOpen} />
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
                                    onChange={(newValue) => {
                                        setValue(newValue);
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
                                value={age}
                                // onChange={handleChange}
                                label="Categoria"
                                {...register("categoryId")}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Salário</MenuItem>
                                <MenuItem value={20}>Saúde</MenuItem>
                                <MenuItem value={30}>Lazer</MenuItem>
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
