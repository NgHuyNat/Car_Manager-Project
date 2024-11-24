import React, { useState, useEffect } from "react";
import "./Cars.css";
import { getCookie } from "../../helper/cookies";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Cars() {
  const username = getCookie("username");
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    releaseyear: "",
    price: "",
    type: "",
    battery_capacity: "",
    range_per_charge: "",
    fuel_tank_capacity: "",
    fuel_efficiency: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Lưu giá trị tìm kiếm
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCar, setModalCar] = useState();
  const [carId, setCarId] = useState("");
  const handleopenModal = () => {
    setModalCar(!modalCar);
  };
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:3000/car");
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
        await fetch(`http://localhost:3000/car/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        fetchVehicles();
        setEditingId(null);
        setModalCar(false);
      } catch (error) {
        console.error("Lỗi khi cập nhật xe:", error);
      }
    } else {
      try {
        await fetch("http://localhost:3000/car", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        fetchVehicles();
        setModalCar(false);
      } catch (error) {
        console.error("Lỗi khi thêm xe mới:", error);
      }
    }

    setFormData({
      id: "",
      name: "",
      brand: "",
      releaseyear: "",
      price: "",
      type: "",
      image: "",
      battery_capacity: "",
      range_per_charge: "",
      fuel_tank_capacity: "",
      fuel_efficiency: "",
      enginetype: "",
    });
  };

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const [purchaseData, setPurchaseData] = useState({
    customerid: "",
    employeeid: "",
    carid: "",
    date: "",
    detail: "",
  });

  const handleOpenPurchaseModal = async (id) => {
    await setIsPurchaseModalOpen(true);
    setCarId(id);
  };

  const handlePurchase = async () => {
    try {
      const purchaseInfo = {
        carid: carId,
        customerid: Number(purchaseData.customerid),
        employeeid: Number(purchaseData.employeeid),
        date: purchaseData.date,
        detail: purchaseData.detail,
      };

      await fetch("http://localhost:8081/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseInfo),
      });

      alert("Mua xe thành công!");

      await soldCar(purchaseInfo.carid);

      setIsPurchaseModalOpen(false);
      setPurchaseData({
        carid: "",
        customerid: "",
        employeeid: "",
        purchasedate: "",
        detail: "",
      });
    } catch (error) {
      console.error("Lỗi khi mua xe:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleEditVehicle = (id) => {
    const vehicle = vehicles.find((v) => v.id === id);
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      releaseyear: vehicle.releaseyear,
      price: vehicle.price,
      type: vehicle.type,
      image: vehicle.image,
      battery_capacity: vehicle.battery_capacity,
      range_per_charge: vehicle.range_per_charge,
      fuel_tank_capacity: vehicle.fuel_tank_capacity,
      fuel_efficiency: vehicle.fuel_efficiency,
      enginetype: vehicle.enginetype,
    });
    setEditingId(id);
    setModalCar(true);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`http://localhost:3000/car/${id}`, {
            method: "DELETE",
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchVehicles();
          setIsModalOpen(false);
        }
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

  const soldCar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/car/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi cập nhật trạng thái xe: ${response.statusText}`);
      }

      const message = await response.text();
      alert(message);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái xe:", error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái xe. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="header-car">
          <div>
            <h2>Thông Tin Xe</h2>
            <br></br>
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
        {modalCar && (
          <form onSubmit={handleAddOrUpdateVehicle} className="form-vehicle">
            <input
              name="name"
              placeholder="Tên xe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              name="image"
              placeholder="URL hình ảnh"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
            <input
              name="brand"
              placeholder="Hãng xe"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
            <input
              name="releaseyear"
              placeholder="Năm sản xuất"
              value={formData.releaseyear}
              onChange={handleInputChange}
              required
            />
            <input
              name="price"
              placeholder="Giá bán"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              name="type"
              placeholder="Loại xe"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
            <select
              name="enginetype"
              value={formData.enginetype}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn loại động cơ</option>
              <option value="ELECTRIC">ELECTRIC</option>
              <option value="GASOLINE">GASOLINE</option>
            </select>
            {formData.enginetype === "ELECTRIC" && (
              <>
                <input
                  name="battery_capacity"
                  placeholder="Dung lượng pin (kWh)"
                  value={formData.battery_capacity}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="range_per_charge"
                  placeholder="Tầm hoạt động mỗi lần sạc (km)"
                  value={formData.range_per_charge}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}
            {formData.enginetype === "GASOLINE" && (
              <>
                <input
                  name="fuel_tank_capacity"
                  placeholder="Dung tích bình xăng (lít)"
                  value={formData.fuel_tank_capacity}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="fuel_efficiency"
                  placeholder="Hiệu suất nhiên liệu (km/lít)"
                  value={formData.fuel_efficiency}
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên xe hoặc hãng xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Mã Xe</th>
                <th>Hình ảnh</th>
                <th>Tên xe</th>
                <th>Hãng xe</th>
                <th>Năm sản xuất</th>
                <th>Giá bán</th>
                <th>Loại xe</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>
                    {vehicle.image ? (
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        style={{
                          width: "100px",
                          height: "60px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectVehicle(vehicle.id)}
                      />
                    ) : (
                      "Không có hình ảnh"
                    )}
                  </td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.releaseyear}</td>
                  <td>{vehicle.price}</td>
                  <td>{vehicle.type}</td>

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
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-content" tabIndex="0">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Thông tin xe đã chọn:</h3>
            {selectedVehicle.image && (
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            )}
            <p>
              <b>Tên xe:</b> {selectedVehicle.name}
            </p>
            <p>
              <b>Hãng xe:</b> {selectedVehicle.brand}
            </p>
            <p>
              <b>Năm sản xuất:</b> {selectedVehicle.releaseyear}
            </p>
            <p>
              <b>Giá bán:</b> {selectedVehicle.price}
            </p>
            <p>
              <b>Loại xe:</b> {selectedVehicle.type}
            </p>
            {selectedVehicle.battery_capacity &&
              selectedVehicle.range_per_charge && (
                <>
                  {" "}
                  <p>
                    <b>Dung lượng pin:</b> {selectedVehicle.battery_capacity}
                  </p>
                  <p>
                    <b>Tầm hoạt động mỗi lần sạc:</b>
                    {selectedVehicle.range_per_charge}
                  </p>
                </>
              )}
            {selectedVehicle.fuel_tank_capacity &&
              selectedVehicle.fuel_efficiency && (
                <>
                  {" "}
                  <p>
                    <b>Dung tích bình xăng:</b>{" "}
                    {selectedVehicle.fuel_tank_capacity}
                  </p>
                  <p>
                    <b>Hiệu suất nhiên liệu:</b>{" "}
                    {selectedVehicle.fuel_efficiency}
                  </p>
                </>
              )}
          </div>
        </div>
      )}
      {isPurchaseModalOpen && (
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
                  name="customerid"
                  value={purchaseData.customerid}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      customerid: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>ID Nhân viên:</label>
                <input
                  type="text"
                  name="employeeid"
                  value={purchaseData.employeeid}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      employeeid: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Ngày mua:</label>
                <input
                  type="date"
                  name="date"
                  value={purchaseData.date}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Thêm chi tiết:</label>
                <textarea
                  name="detail"
                  value={purchaseData.detail}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      detail: e.target.value,
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
