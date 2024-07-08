import { Box, CircularProgress } from "@mui/material"

const Loading = () => {

    return (
        <Box className={`flex justify-center items-center w-full h-full`}>
            <CircularProgress className={`flex text-primary`} />
        </Box>
    )
}

export default Loading