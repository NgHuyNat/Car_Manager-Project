import React, { useEffect, useState } from "react";
import "./nhanvien.css";

function Nhanvien() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newusers, setNewusers] = useState({
    id: "",
    name: "",
    role: "",
    phonenumber: "",
    email: "",
    address: "",
    salary: "",
    salarybonus: "",
    defaultsalary: "",
    carsoldtotal: "",
  });
  const [editMode, setEditMode] = useState(false); // Chế độ chỉnh sửa
  const [editUser, setEditUser] = useState(null); // Khách hàng đang chỉnh sửa
  const [openmodal, setmodal] = useState(false);

  const handleOpen = () => {
    setmodal(!openmodal);
  };

  useEffect(() => {
    fetch("http://localhost:3000/Nhanvien")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setNewusers({ ...newusers, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/Nhanvien", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newusers),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers([...customers, data]);
        setNewusers({
          id: "",
          name: "",
          role: "",
          phonenumber: "",
          email: "",
          address: "",
          salary: "",
          salarybonus: "",
          defaultsalary: "",
          carsoldtotal: "",
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  // Hàm xử lý xóa khách hàng
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/Nhanvien/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCustomers(customers.filter((user) => user.id != id));
      })
      .catch((error) => {
        setError(error);
      });
  };

  // Hàm xử lý chỉnh sửa khách hàng
  const handleEdit = (user) => {
    setEditMode(true);
    setEditUser(user);
    setNewusers(user); // Load thông tin khách hàng vào form
    setmodal(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Nhanvien/${editUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newusers),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(
          customers.map((user) => (user.id == editUser.id ? data : user))
        );
        setEditMode(false);
        setEditUser(null);
        setNewusers({
          id: "",
          name: "",
          role: "",
          phonenumber: "",
          email: "",
          address: "",
          salary: "",
          salarybonus: "",
          defaultsalary: "",
          carsoldtotal: "",
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="customer-table">
      <h2>Bảng Nhân Viên</h2>
      <button onClick={handleOpen} style={{ cursor: "pointer" }}>
        + Nhân viên mới
      </button>
      {openmodal && (
        <form
          onSubmit={editMode ? handleUpdateUser : handleAddUser}
          className="add-customer-form"
        >
          <div className="add-customer-form--body">
            <input
              type="text"
              name="name"
              placeholder="Tên nhân viên"
              value={newusers.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Chức vụ"
              value={newusers.role}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phonenumber"
              placeholder="Số điện thoại"
              value={newusers.phonenumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="Email"
              name="email"
              placeholder="email"
              value={newusers.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={newusers.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="salary"
              placeholder="Lương"
              value={newusers.salary}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="salarybonus"
              placeholder="Lương thưởng"
              value={newusers.salarybonus}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="defaultsalary"
              placeholder="Lương mặc định"
              value={newusers.defaultsalary}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="carsoldtotal"
              placeholder="Số xe bán được"
              value={newusers.carsoldtotal}
              onChange={handleInputChange}
              required
            />
            <div className="group-btn">
              <button type="submit">{editMode ? "Cập nhật" : "Thêm"}</button>
            </div>
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TenNV</th>
            <th>ChucVu</th>
            <th>SDT</th>
            <th>Email</th>
            <th>DiaChi</th>
            <th>Luong</th>
            <th>Luongthuong</th>
            <th>Luongmacdinh</th>
            <th>SoXeBanDuoc</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.salary}</td>
              <td>{user.salarybonus}</td>
              <td>{user.defaultsalary}</td>
              <td>{user.carsoldtotal}</td>

              <td>
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Nhanvien;
