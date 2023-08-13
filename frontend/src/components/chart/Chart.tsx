// Styles
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { name: "Janeiro", Total: 1200 },
    { name: "Fevereiro", Total: 2100 },
    { name: "Março", Total: 800 },
    { name: "Abril", Total: 1600 },
    { name: "Maio", Total: 900 },
    { name: "Junho", Total: 1700 },
    { name: "Julho", Total: 1300 },
    { name: "Agosto", Total: 1300 },
    { name: "Setembro", Total: 1500 },
    { name: "Outubro", Total: 2000 },
    { name: "Novembro", Total: 2700 },
    { name: "Dezembro", Total: 1100 },
];

const Chart = ({ aspect, title }) => {
    return (
        <div className={`shadow-md p-3 text-primary w-full`}>
            <div className={`font-bold mb-3`}>{title}</div>
            <ResponsiveContainer
                width={'100%'}
                aspect={aspect}
            >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="1 2" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="var(--font-color)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
