import React, { useState, useEffect } from "react";
import "./Cars.css";

function Cars() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    Brand: "",
    Releaseyear: "",
    Price: "",
    Type: "",
    Battery_capacity: "",
    Range_per_charge: "",
    Fuel_tank_capacity: "",
    Fuel_efficiency: "",
    Enginetype: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalCar, setModalCar] = useState();
  const [filterEnginetype, setFilterEnginetype] = useState(""); // Lưu trạng thái loại động cơ được lọc
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
          body: JSON.stringify(formData), // không bao gồm MaXe
        });
        fetchVehicles();
        setEditingId(null);
      } catch (error) {
        console.error("Lỗi khi cập nhật xe:", error);
      }
    } else {
      try {
        // Thêm xe mới qua API
        await fetch("http://localhost:3000/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // không bao gồm MaXe
        });
        fetchVehicles();
      } catch (error) {
        console.error("Lỗi khi thêm xe mới:", error);
      }
    }
    setFormData({
      id: "",
      Name: "",
      Brand: "",
      Releaseyear: "",
      Price: "",
      Type: "",
      img: "",
      Battery_capacity: "",
      Range_per_charge: "",
      Fuel_tank_capacity: "",
      Fuel_efficiency: "",
      Enginetype: "",
    });
  };

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    customerName: "",
    employeeName: "",
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
      // Lấy thông tin xe
      const vehicleResponse = await fetch(
        `http://localhost:3000/vehicles/${purchaseData.vehicleId}`
      );
      const vehicle = await vehicleResponse.json();

      // Lấy thông tin khách hàng
      const customerResponse = await fetch(
        `http://localhost:3000/users/${purchaseData.customerId}`
      );
      const customer = await customerResponse.json();

      // Lấy thông tin nhân viên
      const employeeResponse = await fetch(
        `http://localhost:3000/Nhanvien/${purchaseData.employeeId}`
      );
      const employee = await employeeResponse.json();

      // Tạo thông tin mua xe
      const purchaseInfo = {
        vehicleId: purchaseData.vehicleId,
        customerId: purchaseData.customerId,
        employeeId: purchaseData.employeeId,
        purchaseDate: purchaseData.purchaseDate,
        details: purchaseData.details,
        vehicle, // Lưu thông tin chi tiết xe
        customer, // Lưu thông tin chi tiết khách hàng
        employee, // Lưu thông tin chi tiết nhân viên
      };

      // Gửi yêu cầu lưu vào API
      await fetch("http://localhost:3000/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseInfo),
      });

      alert("Mua xe thành công!");
      setIsPurchaseModalOpen(false); // Đóng modal mua
      setPurchaseData({
        vehicleId: "",
        customerId: "",
        employeeId: "",
        purchaseDate: "",
        details: "",
      }); // Reset form
    } catch (error) {
      console.error("Lỗi khi mua xe:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleEditVehicle = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setFormData({
      Name: vehicle.Name,
      Brand: vehicle.Brand,
      Releaseyear: vehicle.Releaseyear,
      Price: vehicle.Price,
      Type: vehicle.Type,
      img: vehicle.img,
      Battery_capacity: vehicle.Battery_capacity,
      Range_per_charge: vehicle.Range_per_charge,
      Fuel_tank_capacity: vehicle.Fuel_tank_capacity,
      Fuel_efficiency: vehicle.Fuel_efficiency,
      Enginetype: vehicle.Enginetype,
    });
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
            {/* Tên xe */}
            <input
              name="Name"
              placeholder="Tên xe"
              value={formData.Name}
              onChange={handleInputChange}
              required
            />
            {/* URL hình ảnh */}
            <input
              name="img"
              placeholder="URL hình ảnh"
              value={formData.img}
              onChange={handleInputChange}
            />
            {/* Hãng xe */}
            <input
              name="Brand"
              placeholder="Hãng xe"
              value={formData.Brand}
              onChange={handleInputChange}
              required
            />
            {/* Năm sản xuất */}
            <input
              name="Releaseyear"
              placeholder="Năm sản xuất"
              value={formData.Releaseyear}
              onChange={handleInputChange}
              required
            />
            {/* Giá bán */}
            <input
              name="Price"
              placeholder="Giá bán"
              value={formData.Price}
              onChange={handleInputChange}
              required
            />
            {/* Loại xe */}
            <input
              name="Type"
              placeholder="Loại xe"
              value={formData.Type}
              onChange={handleInputChange}
              required
            />
            {/* Loại động cơ */}
            <select
              name="Enginetype"
              value={formData.Enginetype}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn loại động cơ</option>
              <option value="ELECTRIC">ELECTRIC</option>
              <option value="GASOLINE">GASOLINE</option>
            </select>

            {/* Các trường động theo loại động cơ */}
            {formData.Enginetype === "ELECTRIC" && (
              <>
                <input
                  name="Battery_capacity"
                  placeholder="Dung lượng pin (kWh)"
                  value={formData.Battery_capacity}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="Range_per_charge"
                  placeholder="Tầm hoạt động mỗi lần sạc (km)"
                  value={formData.Range_per_charge}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {formData.Enginetype === "GASOLINE" && (
              <>
                <input
                  name="Fuel_tank_capacity"
                  placeholder="Dung tích bình xăng (lít)"
                  value={formData.Fuel_tank_capacity}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="Fuel_efficiency"
                  placeholder="Hiệu suất nhiên liệu (km/lít)"
                  value={formData.Fuel_efficiency}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

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
                <th>Tên xe</th>
                <th>Hãng xe</th>
                <th>Năm sản xuất</th>
                <th>Giá bán</th>
                <th>Loại xe</th>

                <th>Dung lượng pin</th>
                <th>Tầm hoạt động mỗi lần sạc</th>
                <th>Dung tích bình xăng</th>
                <th>Hiệu suất nhiên liệu</th>

                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id}>
                  <td>{index + 1}</td>
                  <td>
                    {vehicle.img ? (
                      <img
                        src={vehicle.img}
                        alt={vehicle.Name}
                        style={{ width: "100px", height: "60px" }}
                        onClick={() => handleSelectVehicle(vehicle.id)}
                      />
                    ) : (
                      "Không có hình ảnh"
                    )}
                  </td>
                  <td>{vehicle.Name}</td>
                  <td>{vehicle.Brand}</td>
                  <td>{vehicle.Releaseyear}</td>
                  <td>{vehicle.Price}</td>
                  <td>{vehicle.Type}</td>
                  <td>{vehicle.Battery_capacity}</td>
                  <td>{vehicle.Range_per_charge}</td>
                  <td>{vehicle.Fuel_tank_capacity}</td>
                  <td>{vehicle.Fuel_efficiency}</td>

                  <td>
                    <button onClick={() => handleEditVehicle(vehicle.id)}>
                      Sửa
                    </button>
                    <button onClick={() => handleDeleteVehicle(vehicle.id)}>
                      Xóa
                    </button>
                    <button onClick={() => handleOpenPurchaseModal(vehicle.id)}>
                      Mua
                    </button>
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
            {selectedVehicle.img && (
              <img
                src={selectedVehicle.img}
                alt={selectedVehicle.Name}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            )}

            <p>
              <b>Tên xe:</b> {selectedVehicle.Name}
            </p>
            <p>
              <b>Hãng xe:</b> {selectedVehicle.Brand}
            </p>
            <p>
              <b>Năm sản xuất:</b> {selectedVehicle.Releaseyear}
            </p>
            <p>
              <b>Giá bán:</b> {selectedVehicle.Price}
            </p>
            <p>
              <b>Loại xe:</b> {selectedVehicle.Type}
            </p>
            <p>
              <b>Dung lượng pin:</b> {selectedVehicle.Battery_capacity}
            </p>
            <p>
              <b>Tầm hoạt động mỗi lần sạc:</b>
              {selectedVehicle.Range_per_charge}
            </p>
            <p>
              <b>Dung tích bình xăng:</b> {selectedVehicle.Fuel_tank_capacity}
            </p>
            <p>
              <b>Hiệu suất nhiên liệu:</b> {selectedVehicle.Fuel_efficiency}
            </p>
            <p>
              <b>Loại động cơ:</b> {selectedVehicle.Enginetype}
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
              {/* Nhập ID xe */}
              <div>
                <label>ID Xe:</label>
                <input
                  type="text"
                  name="vehicleId"
                  value={purchaseData.vehicleId}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      vehicleId: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Nhập ID khách hàng */}
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

              {/* Nhập ID nhân viên */}
              <div>
                <label>ID Nhân viên:</label>
                <input
                  type="text"
                  name="employeeId"
                  value={purchaseData.employeeId}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      employeeId: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Ngày mua */}
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

              {/* Ghi chú */}
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

              <button type="submit">Xác nhận mua</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Cars;
