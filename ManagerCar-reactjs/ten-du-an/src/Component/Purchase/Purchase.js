import React, { useEffect, useState } from "react";
import "./Purchases.css";

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost:3000/contact");
      const data = await response.json();

      const sanitizedData = data.map((item) => ({
        ...item,
        id: item.id,
        customer: item.customer || { name: "Chưa xác định" },
        employee: item.employee || { name: "Chưa xác định" },
        car: item.car || { name: "Không có thông tin", price: "0" },
        date: item.date || "Chưa xác định",
        detail: item.detail || "Không có chi tiết",
      }));

      setPurchases(sanitizedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giao dịch:", error);
    }
  };

  const handleDeletePurchase = (id) => {
    fetch(`http://localhost:3000/contact/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setPurchases(purchases.filter((purchase) => purchase.id !== id));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa giao dịch:", error);
      });
  };

  return (
    <div className="purchases-container">
      <h2>Danh sách giao dịch mua xe</h2>
      {purchases.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="purchases-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Tên nhân viên</th>
              <th>Tên xe</th>
              <th>Ngày mua</th>
              <th>Chi tiết</th>
              <th>Tổng tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, id) => (
              <tr key={id}>
                <td>{purchase.id}</td>
                <td>{purchase.customer?.name}</td>
                <td>{purchase.employee?.name}</td>
                <td>{purchase.car?.name}</td>
                <td>{purchase.date}</td>
                <td>{purchase.detail}</td>
                <td>{purchase.car?.price}</td>
                <td>
                  <button onClick={() => handleDeletePurchase(purchase.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Purchases;
