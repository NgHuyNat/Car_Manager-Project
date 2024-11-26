import React, { useEffect, useState } from "react";
import "./nhanvien.css";
import { fetchWithAuth } from "../../ultils/request";

function Nhanvien() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    role: "employee",
    phoneNumber: "",
    email: "",
    address: "",
    salary: "",
    bonusSalary: "",
    defaultSalary: "",
    carsSoldTotal: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchWithAuth("/api/employees");
      setEmployees(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  // Add or update employee
  const handleAddOrUpdateEmployee = async (e) => {
    e.preventDefault();

    const url = editMode
      ? `/api/employees/${employeeForm.id}`
      : "/api/employees";
    const method = editMode ? "PUT" : "POST";

    try {
      console.log(employeeForm);
      await fetchWithAuth(url, method, employeeForm);
      await fetchEmployees(); // Làm mới danh sách nhân viên
      resetForm();
      setOpenModal(false);
    } catch (error) {
      let errorMessage = "Đã xảy ra lỗi không xác định."; // Thông báo mặc định

      // Kiểm tra phản hồi từ backend
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      // Hiển thị lỗi qua alert
      alert(errorMessage);
    }
  };


  // Delete employee
  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(`/api/employees/${id}`, "DELETE");
      await fetchEmployees(); // Refresh employee list
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setEditMode(true);
    setEmployeeForm(employee);
    setOpenModal(true);
  };

  // Reset form
  const resetForm = () => {
    setEmployeeForm({
      id: "",
      name: "",
      username: "",
      password: "",
      role: "",
      phoneNumber: "",
      email: "",
      address: "",
      salary: "",
      bonusSalary: "",
      defaultSalary: "",
      carsSoldTotal: "",
    });
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="customer-table">
      <h2>Bảng Nhân Viên</h2>
      <button className="customer-table__btn" onClick={() => setOpenModal(true)} style={{ cursor: "pointer" }}>
        + Nhân viên mới
      </button>
      {openModal && (
        <form onSubmit={handleAddOrUpdateEmployee} className="add-employee-form">
          <h3>Thêm nhân viên</h3>
          <div className="add-employee-form--body">
            <div className="add-employee-form--list">
              <div className="add-employee-form--items">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên nhân viên"
                  value={employeeForm.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  value={employeeForm.username}
                  onChange={handleInputChange}
                  required
                />
                {!editMode && (
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={employeeForm.password}
                    onChange={handleInputChange}
                    required
                    className="kind_off"
                  />
                )}
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  value={employeeForm.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="add-employee-form--items">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={employeeForm.email}
                  onChange={handleInputChange}
                  required
                  className="kind_off"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={employeeForm.address}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="salary"
                  placeholder="Lương"
                  value={employeeForm.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="group-btn">
              <button type="submit">{editMode ? "Cập nhật" : "Thêm"}</button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setOpenModal(false);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}
      <table className="tbl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên nhân viên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Lương</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.salary}</td>
              <td className="add_car_button">
                <div className="pen">
                  <img
                    className="add_car_button--items"
                    onClick={() => handleEdit(employee)}
                    src="sửa.png"
                  ></img>
                </div>
                <div className="delete">
                  <img
                    className="add_car_button--items"
                    onClick={() => handleDelete(employee.id)}
                    src="thùng-rác.png"
                  ></img>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Nhanvien;
