import TableHead from "../../components/shared/table/TableHead"
import SidePanel from "../../components/widget/SidePanel"



const Loading = () => {
    return (
        <div className="flex p-4 gap-2 animate-pulse">
            <SidePanel {
                ...{
                    totalBalance: 0,
                    totalExpense: 0,
                    totalIncome: 0
                }
            } />

            <div className={'flex flex-1 flex-col gap-3'}>
                <TableHead />
                <div className="grid grid-cols-1 px-10 py-6 rounded-md h-16 shadow-md  items-center content-center">
                    <span className="text-gray-500">Carregando...</span>
                </div>
                <div className="grid grid-cols-1 px-10 py-6 rounded-md h-16 shadow-md   items-center content-center">
                    <span className="text-gray-500">Carregando...</span>
                </div>
                <div className="grid grid-cols-1 px-10 py-6 rounded-md h-16 shadow-md  items-center content-center">
                    <span className="text-gray-500">Carregando...</span>
                </div>

            </div>
        </div>
    )
    // return (
    //     <Box className={`flex justify-center items-center w-full h-full`}>
    //         <CircularProgress className={`flex text-primary`} />
    //     </Box>
    // )
}

export default Loading