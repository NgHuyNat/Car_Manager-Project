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
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Lưu giá trị tìm kiếm
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCar, setModalCar] = useState();
  const [carId, setCarId] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchEmployees();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees");
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
    }
  };

  const handleopenModal = () => {
    setModalCar(!modalCar);
  };
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:8080/car/soldcar?sold=0");
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
        await fetch(`http://localhost:8080/car/updatecar/${editingId}`, {
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
        await fetch("http://localhost:8080/car/addcar", {
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
    customername: "",
    employeename: "",
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
      const customer = customers.find(
        (c) => c.name === purchaseData.customername
      );
      const employee = employees.find(
        (e) => e.name === purchaseData.employeename
      );

      if (!customer || !employee) {
        alert("Chưa chọn khách hàng hoặc nhân viên.");
        return;
      }

      const purchaseInfo = {
        carid: carId,
        customername: customer.id, // Lấy ID từ tên
        employeename: employee.id, // Lấy ID từ tên
        date: purchaseData.date,
        detail: purchaseData.detail,
      };

      await fetch("http://localhost:8080/contact/addcontact", {
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
        customername: "",
        employeename: "",
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
          await fetch(`http://localhost:8080/car/deletecar/${id}`, {
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
      const response = await fetch(
        `http://localhost:8080/car/updatesoldcar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
        <div className="bar__search">
          <button
            className="add_car"
            onClick={handleopenModal}
            style={{ cursor: "pointer" }}
          >
            + Xe mới
          </button>
          <div className="search-bar">
            <input
              className="search"
              type="text"
              placeholder="Tìm kiếm theo tên xe hoặc hãng xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
            />
            <img className="search-img" src="search.png"></img>
          </div>
        </div>
        {modalCar && (
          <form onSubmit={handleAddOrUpdateVehicle} className="form-vehicle">
            <h3>Thêm xe mới</h3>
            <div className="form-vehicle__list">
              <div className="form-vehicle__items">
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
              </div>
              <div className="form-vehicle__items">
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
              </div>
            </div>
            <select
              name="enginetype"
              value={formData.enginetype}
              onChange={handleInputChange}
              required
              className="kind_of"
            >
              {/* <option className="add_car" value="">Chọn loại động cơ</option> */}
              <option className="add_car" value="ELECTRIC">
                ELECTRIC
              </option>
              <option className="add_car" value="GASOLINE">
                GASOLINE
              </option>
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

        <h3 className="list-heading">Danh sách xe </h3>
        <div className="info-box-header">
          <div className="info-box">
            <table>
              <thead>
                <tr className="trr">
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
                          style={{ width: "100px", height: "60px" }}
                          onClick={() => handleSelectVehicle(vehicle.id)}
                        />
                      ) : (
                        "Không có hình ảnh"
                      )}
                    </td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.releaseyear}</td>
                    <td>{formatCurrency(vehicle.price)}</td>
                    <td>{vehicle.type}</td>

                    <td className="add_car_button">
                      <div className="pen">
                        <img
                          className="add_car_button--items"
                          onClick={() => handleEditVehicle(vehicle.id)}
                          src="sửa.png"
                        ></img>
                      </div>
                      <div className="delete">
                        <img
                          className="add_car_button--items"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          src="thùng-rác.png"
                        ></img>
                      </div>
                      <div className="buy">
                        <img
                          className="add_car_button--items"
                          onClick={() => handleOpenPurchaseModal(vehicle.id)}
                          src="mua.png"
                        ></img>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedVehicle && (
        <div className="modal">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-content" tabIndex="0">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Thông tin xe đã chọn</h3>
            <div className="info_car--list">
              <div>
                {selectedVehicle.image && (
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} />
                )}
              </div>
              <div className="info_car--items">
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
                  <b>Giá bán:</b> {formatCurrency(selectedVehicle.price)}
                </p>
                <p>
                  <b>Loại xe:</b> {selectedVehicle.type}
                </p>
                {selectedVehicle.battery_capacity &&
                  selectedVehicle.range_per_charge && (
                    <>
                      {" "}
                      <p>
                        <b>Dung lượng pin:</b>{" "}
                        {selectedVehicle.battery_capacity}
                      </p>
                      <p>
                        <b>Tầm hoạt động mỗi lần sạc: </b>
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
              <div className="modal-content__items">
                <label>Tên Khách hàng:</label>
                <select
                  name="customername"
                  value={purchaseData.customername}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      customername: e.target.value, // Lưu tên
                    })
                  }
                  required
                >
                  <option value="">Chọn khách hàng</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.name}>
                      {" "}
                      {/* Lưu tên khách hàng */}
                      {customer.name}
                    </option>
                  ))}
                </select>

                <label>Tên Nhân viên:</label>
                <select
                  name="employeename"
                  value={purchaseData.employeename}
                  onChange={(e) =>
                    setPurchaseData({
                      ...purchaseData,
                      employeename: e.target.value, // Lưu tên nhân viên
                    })
                  }
                  required
                >
                  <option value="">Tên Nhân viên</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.name}>
                      {" "}
                      {/* Lưu tên nhân viên */}
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-content__items">
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
              <div className="modal-content__items">
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
              <button className="modal-btn" type="submit">
                Xác nhận mua
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Cars;
