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
            <th>Tên khách hàng</th>
            <th>Tên nhân viên</th>
            <th>Tên xe</th>
            <th>Giá bán</th>
            <th>Ngày mua</th>
            <th>Chi tiết</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase.id}>
              <td>{index + 1}</td>
              <td>{purchase.customerName}</td>
              <td>{purchase.employeeName}</td>
              <td>{purchase.vehicle.type}</td>
              <td>{purchase.vehicle.price}</td>
              <td>{purchase.purchaseDate}</td>
              <td>{purchase.details}</td>
              <td>
                <button>Xem</button>
                <button>Sửa</button>
                <button>Đã bán</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
