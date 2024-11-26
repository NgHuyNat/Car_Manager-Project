import React, { useEffect, useState } from "react";
import "./Purchases.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Trạng thái modal
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Lưu thông tin khách hàng khi nhấn vào tên

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost:8080/contact"); // API endpoint
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/contact/deletecontact/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            setPurchases(purchases.filter((purchase) => purchase.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Lỗi khi xóa giao dịch:", error);
          });
      }
    });
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer); // Lưu thông tin khách hàng khi nhấn
    setModalOpen(true); // Mở modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Đóng modal
  };

  return (
    <div className="purchases-container">
      <h2>Danh sách giao dịch mua xe</h2>
      {purchases.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="purchases-table">
          <thead>
            <tr className="tr_purchase">
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
                <td
                  onClick={() => handleCustomerClick(purchase.customer)}
                  style={{ cursor: "pointer" }}
                >
                  {purchase.customer?.name}
                </td>
                <td>{purchase.employee?.name}</td>
                <td>{purchase.car?.name}</td>
                <td>{purchase.date}</td>
                <td>{purchase.detail}</td>
                <td>{purchase.car?.price}</td>
                <td className="add_car_button">
                  <div className="delete">
                    <img
                      className="add_car_button--items"
                      onClick={() => handleDeletePurchase(purchase.id)}
                      src="thùng-rác.png"
                    ></img>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal hiển thị thông tin chi tiết khách hàng */}
      {modalOpen && selectedCustomer && (
        <div className="purchase__detail">
          <div className="purchase__detail--container">
            <h3>Thông tin chi tiết</h3>
            <p>
              <strong>Tên khách hàng:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedCustomer.phonenumber}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedCustomer.address}
            </p>
            <button onClick={handleCloseModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Purchases;
