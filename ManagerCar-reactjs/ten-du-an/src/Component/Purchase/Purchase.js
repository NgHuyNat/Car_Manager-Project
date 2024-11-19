import React, { useEffect, useState } from "react";
import "./Purchases.css"; // Tạo file CSS nếu cần

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  // Fetch data từ API khi component render lần đầu
  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost:3000/purchases"); // Đường dẫn đến API
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giao dịch:", error);
    }
  };

  return (
    <div className="purchases-container">
      <h2>Danh sách giao dịch mua xe</h2>
      <table className="purchases-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID Khách hàng</th>
            <th>Tên xe</th>
            <th>Hãng xe</th>
            <th>Loại xe</th>
            <th>Giá bán</th>
            <th>Ngày mua</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase.id}>
              <td>{index + 1}</td>
              <td>{purchase.customerId}</td>
              <td>{purchase.vehicle.TenXe}</td>
              <td>{purchase.vehicle.HangXe}</td>
              <td>{purchase.vehicle.LoaiXe}</td>
              <td>{purchase.vehicle.GiaBan}</td>
              <td>{purchase.purchaseDate}</td>
              <td>{purchase.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
