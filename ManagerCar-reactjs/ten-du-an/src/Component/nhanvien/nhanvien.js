import React, { useEffect, useState } from "react";
import "./nhanvien.css";

function Nhanvien() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newusers, setNewusers] = useState({
    MaNV: "",
    TenNV: "",
    ChucVu: "",
    SDT: "",
    Email: "",
    DiaChi: "",
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
          MaNV: "",
          TenNV: "",
          ChucVu: "",
          SDT: "",
          Email: "",
          DiaChi: "",
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  // Hàm xử lý xóa khách hàng
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/Nhanvien/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCustomers(customers.filter((user) => user.MaNV !== id));
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
    fetch(`http://localhost:3000/Nhanvien/${editUser.MaNV}`, {
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
          customers.map((user) => (user.MaNV === editUser.MaNV ? data : user))
        );
        setEditMode(false);
        setEditUser(null);
        setNewusers({
          MaNV: "",
          TenNV: "",
          ChucVu: "",
          SDT: "",
          Email: "",
          DiaChi: "",
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
              name="TenNV"
              placeholder="Tên nhân viên"
              value={newusers.TenNV}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="ChucVu"
              placeholder="Chức vụ"
              value={newusers.ChucVu}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="SDT"
              placeholder="Số điện thoại"
              value={newusers.SDT}
              onChange={handleInputChange}
              required
            />
            <input
              type="Email"
              name="Email"
              placeholder="email"
              value={newusers.Email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="DiaChi"
              placeholder="Địa chỉ"
              value={newusers.DiaChi}
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
            <th>MaNV</th>
            <th>TenNV</th>
            <th>ChucVu</th>
            <th>SDT</th>
            <th>Email</th>
            <th>DiaChi</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user) => (
            <tr key={user.MaNV}>
              <td>{user.MaNV}</td>
              <td>{user.TenNV}</td>
              <td>{user.ChucVu}</td>
              <td>{user.SDT}</td>
              <td>{user.Email}</td>
              <td>{user.DiaChi}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user.MaNV)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Nhanvien;
