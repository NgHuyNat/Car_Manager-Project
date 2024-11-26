import React from "react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./index.css";
// Đăng ký các thành phần cần thiết
Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ManagementChart() {
  // Dữ liệu mẫu
  const data = {
    labels: ["Xe", "Khách hàng", "Nhân viên"], // Các danh mục
    datasets: [
      {
        label: "Số lượng",
        data: [50, 120, 30], // Dữ liệu tương ứng với xe, khách hàng, và nhân viên
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)", // Màu nền cho "Xe"
          "rgba(255, 206, 86, 0.5)", // Màu nền cho "Khách hàng"
          "rgba(75, 192, 192, 0.5)", // Màu nền cho "Nhân viên"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Màu viền cho "Xe"
          "rgba(255, 206, 86, 1)", // Màu viền cho "Khách hàng"
          "rgba(75, 192, 192, 1)", // Màu viền cho "Nhân viên"
        ],
        borderWidth: 1, // Độ dày viền
      },
    ],
  };

  // Cấu hình hiển thị biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Quản lý số liệu - Xe, Khách hàng, Nhân viên",
      },
    },
  };

  return (
    <>
      <div className="chart">
        <h2>Biểu đồ quản lý bán xe ô tô</h2>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default ManagementChart;
