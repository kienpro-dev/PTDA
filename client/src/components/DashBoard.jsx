import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import '../assets/scss/components/DashBoard.scss'
import { Space } from "antd";
import DashBoardCard from "./DashBoardCard";
import { dataProducts, dataRevenue, dataUser } from "../data";
import BarChartBox from "./BarChartBox";
import PieChartBox from "./PieChartBox";
import AreaChartBox from "./AreaChartBox";
import { useEffect, useState } from "react";
import { getAllBills, getAllCustomers, getStatisticShops } from "../store/apiRequest";

function Dashboard() {
  const [quantityOfBills, setQuantityOfBills] = useState(0);
  const [quantityOfCustomers, setQuantityOfCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [dataShops, setDataShops] = useState([]);

  const handleGetAllBills = async () => {
    const res = await getAllBills();
    console.log("bill", res);
    setQuantityOfBills(res?.data?.data?.items.length);
  }
  const handleGetAllCustomers = async () => {
    const res = await getAllCustomers();
    setQuantityOfCustomers(res.data.data.items.length);
  }
  const handleGetStatisticOfShops = async () => {
    const res = await getStatisticShops();
    setDataShops(res.data.data);
    const rev = res.data.data.reduce((total, obj) => total + obj.revenue, 0)
    setRevenue(rev);
    console.log(res.data.data, "doanh thu rev");
  }
  useEffect(() => {
    handleGetAllBills();
    handleGetAllCustomers();
    handleGetStatisticOfShops();
  }, [])
  return (
    <div className="admin-dashboard">
      <div className="dashboard-sum">
        <Space size={20} direction="vertical">
          <Space direction="horizontal"
            style={{
              display: "flex",
              justifyContent: 'space-around',
              width: '100%'
            }}>
            <DashBoardCard
              icon={
                <ShoppingCartOutlined
                  style={{
                    color: "green",
                    backgroundColor: "rgba(16, 236, 16, 0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Số đơn đặt hàng"}
              value={quantityOfBills}
              data={dataUser}
            />
            {/* <DashBoardCard
              icon={
                <ShoppingOutlined
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(21, 202, 238, 0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Số hàng tồn kho"}
              value='12354'
              data={dataProducts}
            /> */}
            <DashBoardCard
              icon={
                <UserOutlined
                  style={{
                    color: "purple",
                    backgroundColor: "rgba(203, 127, 236, 0.5)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Tổng số khách hàng"}
              value={quantityOfCustomers}
              data={dataUser}
            />
            <DashBoardCard
              icon={
                <DollarCircleOutlined
                  style={{
                    color: "red",
                    backgroundColor: "rgba(244, 12, 12, 0.2)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Doanh thu"}
              value={revenue}
              data={dataRevenue}
            />

          </Space>
        </Space>
      </div>
      <div className="dashboard-main-charts">
        <div className="dashboard-barchart">
          <BarChartBox dataShops={dataShops}/>
        </div>
        {/* <div className="dashboard-areachart">
          <AreaChartBox />
        </div>
        <div className="dashboard-piechart">
          <PieChartBox />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
