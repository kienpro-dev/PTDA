import { Card, Space, Statistic } from "antd";
import { Tooltip } from "recharts";
import { Line, LineChart, ResponsiveContainer } from "recharts";
// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2000,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 3400,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3008,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 2800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4700,
//         amt: 2100,
//     },
// ];
const DashBoardCard = ({ icon, title, value, data }) => {

    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
                <div className="chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width="{300}" height={100} data={data}>\
                            <Tooltip 
                            contentStyle={{background: "transparent", border: "none"}}
                            labelStyle={{display: "none"}}
                            />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Space>
        </Card>
    );
}

export default DashBoardCard;
