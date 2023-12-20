import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import '../assets/scss/components/BarChartBox.scss'

const BarChartBox = ({dataShops}) => {
    console.log("here is data shops", dataShops);
    return (
        <div className='admin-barChartBox'>
            <h1>Tổng doanh thu các shop</h1>
            <ResponsiveContainer width="98%" height={450}>
                <BarChart width={150} height={40} data={dataShops}>
                    <XAxis dataKey="shopName" />
                    <Tooltip
                        contentStyle={{ background: "blue" }}
                        labelStyle={{ display: "none" }} 
                        cursor={{fill: "none"}}
                    />                        
                    <Bar dataKey="revenue" fill="#fc5209" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartBox