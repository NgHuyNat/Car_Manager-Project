import React, { useState, useEffect } from "react";
import "./Cars.css";

function Cars() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    MaXe: "",
    TenXe: "",
    HangXe: "",
    NamSanXuat: "",
    GiaBan: "",
    LoaiXe: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalCar, setModalCar] = useState();

  const handleopenModal = () => {
    setModalCar(!ModalCar);
  };

  // Fetch dữ liệu từ API khi component render lần đầu
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:3000/vehicles"); // Thay API_URL bằng URL API thực tế
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu xe:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdateVehicle = async (e) => {
    e.preventDefault();
    if (editingId) {
      try {
        // Cập nhật xe qua API
        await fetch(`http://localhost:3000/vehicles/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        fetchVehicles();
        setEditingId(null);
      } catch (error) {
        console.error("Lỗi khi cập nhật xe:", error);
      }
    } else {
      try {
        // Thêm xe mới qua API
        await fetch("API_URL/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        fetchVehicles();
      } catch (error) {
        console.error("Lỗi khi thêm xe mới:", error);
      }
    }
    setFormData({
      id: "",
      MaXe: "",
      TenXe: "",
      HangXe: "",
      NamSanXuat: "",
      GiaBan: "",
      LoaiXe: "",
      HinhAnh: "",
    });
  };
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    customerId: "",
    purchaseDate: "",
    details: "",
  });
  const handleOpenPurchaseModal = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setSelectedVehicle(vehicle); // Lưu xe được chọn
    setIsPurchaseModalOpen(true); // Mở modal mua
  };
  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const purchaseInfo = {
        vehicleId: selectedVehicle.id,
        customerId: purchaseData.customerId,
        purchaseDate: purchaseData.purchaseDate,
        details: purchaseData.details,
        vehicle: { ...selectedVehicle }, // Đính kèm thông tin xe
      };

      // Gửi yêu cầu đến API (thay URL bằng API thực tế của bạn)
      await fetch("http://localhost:3000/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseInfo),
      });

      alert("Mua xe thành công!");
      setIsPurchaseModalOpen(false); // Đóng modal mua
      setPurchaseData({ customerId: "", purchaseDate: "", details: "" }); // Reset form
    } catch (error) {
      console.error("Lỗi khi mua xe:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleEditVehicle = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setFormData(vehicle);
    setEditingId(id);
    setModalCar(true);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await fetch(`http://localhost:3000/vehicles/${id}`, {
        method: "DELETE",
      });
      fetchVehicles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi xóa xe:", error);
    }
  };

  const handleSelectVehicle = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <>
      <div className="container">
        <div className="header-car">
          <div>
            <h2>Thông Tin Xe</h2>
            <p>Kỳ bảo dưỡng: 2024-2025</p>
          </div>
          <div>
            <label>
              <b>Tổng số xe:</b> {vehicles.length}
            </label>
          </div>
        </div>
        <button onClick={handleopenModal} style={{ cursor: "pointer" }}>
          + Xe mới
        </button>
        {ModalCar && (
          <form onSubmit={handleAddOrUpdateVehicle} className="form-vehicle">
            <input
              name="MaXe"
              placeholder="Mã xe"
              value={formData.MaXe}
              onChange={handleInputChange}
              required
            />
            <input
              name="TenXe"
              placeholder="Tên xe"
              value={formData.TenXe}
              onChange={handleInputChange}
              required
            />
            <input
              name="HinhAnh"
              placeholder="URL hình ảnh"
              value={formData.HinhAnh}
              onChange={handleInputChange}
            />

            <input
              name="HangXe"
              placeholder="Hãng xe"
              value={formData.HangXe}
              onChange={handleInputChange}
              required
            />
            <input
              name="NamSanXuat"
              placeholder="Năm sản xuất"
              value={formData.NamSanXuat}
              onChange={handleInputChange}
              required
            />
            <input
              name="GiaBan"
              placeholder="Giá bán"
              value={formData.GiaBan}
              onChange={handleInputChange}
              required
            />
            <input
              name="LoaiXe"
              placeholder="Loại xe"
              value={formData.LoaiXe}
              onChange={handleInputChange}
              required
            />
            <button type="submit">
              {editingId ? "Cập nhật xe" : "Thêm xe mới"}
            </button>
          </form>
        )}

        <div className="info-box">
          <h3>Danh sách xe</h3>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Mã xe</th>
                <th>Tên xe</th>
                <th>Hãng xe</th>
                <th>Năm sản xuất</th>
                <th>Giá bán</th>
                <th>Loại xe</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id}>
                  <td>{index + 1}</td>
                  <td>
                    {vehicle.HinhAnh ? (
                      <img
                        src={vehicle.HinhAnh}
                        alt={vehicle.TenXe}
                        style={{ width: "100px", height: "60px" }}
                        onClick={() => handleSelectVehicle(vehicle.id)}
                      />
                    ) : (
                      "Không có hình ảnh"
                    )}
                  </td>
                  <td>{vehicle.MaXe}</td>
                  <td>{vehicle.TenXe}</td>
                  <td>{vehicle.HangXe}</td>
                  <td>{vehicle.NamSanXuat}</td>
                  <td>{vehicle.GiaBan}</td>
                  <td>{vehicle.LoaiXe}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEditVehicle(vehicle.id);
                      }}
                    >
                      Sửa
                    </button>
                    <button onClick={() => handleDeleteVehicle(vehicle.id)}>
                      Xóa
                    </button>
                    <button onClick={() => handleOpenPurchaseModal(vehicle.id)}>
                      Mua
                    </button>{" "}
                    {/* Nút mua */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedVehicle && (
        <div className="modal">
          <div className="modal-overlay" onClick={closeModal} />{" "}
          {/* Overlay để đóng modal */}
          <div className="modal-content" tabIndex="0">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Thông tin xe đã chọn:</h3>
            {selectedVehicle.HinhAnh && (
              <img
                src={selectedVehicle.HinhAnh}
                alt={selectedVehicle.TenXe}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            )}
            <p>
              <b>Mã xe:</b> {selectedVehicle.MaXe}
            </p>
            <p>
              <b>Tên xe:</b> {selectedVehicle.TenXe}
            </p>
            <p>
              <b>Hãng xe:</b> {selectedVehicle.HangXe}
            </p>
            <p>
              <b>Năm sản xuất:</b> {selectedVehicle.NamSanXuat}
            </p>
            <p>
              <b>Giá bán:</b> {selectedVehicle.GiaBan}
            </p>
            <p>
              <b>Loại xe:</b> {selectedVehicle.LoaiXe}
            </p>
          </div>
        </div>
      )}
      {isPurchaseModalOpen && selectedVehicle && (
        <div className="modal">
          <div
            className="modal-overlay"
            onClick={() => setIsPurchaseModalOpen(false)}
          />
          <div className="modal-content" tabIndex="0">
            <span
              className="close"
              onClick={() => setIsPurchaseModalOpen(false)}
            >
              &times;
            </span>
            <h3>Thông tin mua xe</h3>

            <form onSubmit={handlePurchase}>
              <div>
                <label>ID Khách hàng:</label>
                <input
                  type="text"
                  name="customerId"
                  value={purchaseData.customerId}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      customerId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Ngày mua:</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={purchaseData.purchaseDate}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      purchaseDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Thêm chi tiết:</label>
                <textarea
                  name="details"
                  value={purchaseData.details}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      details: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <h4>Thông tin xe:</h4>
              <p>
                <b>Tên xe:</b> {selectedVehicle.TenXe}
              </p>
              <p>
                <b>Hãng xe:</b> {selectedVehicle.HangXe}
              </p>
              <p>
                <b>Giá bán:</b> {selectedVehicle.GiaBan}
              </p>

              <button type="submit">Xác nhận mua</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Cars;
