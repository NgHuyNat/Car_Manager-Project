import React, { useEffect, useState } from "react";
import "./user.css";

function Users() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newusers, setNewusers] = useState({
    MaKH: "",
    name: "",
    phonenumber: "",
    email: "",
    address: "",
  });
  const [editMode, setEditMode] = useState(false); // Chế độ chỉnh sửa
  const [editUser, setEditUser] = useState(null); // Khách hàng đang chỉnh sửa
  const [openmodal, setmodal] = useState(false);

  const handleOpen = () => {
    setmodal(!openmodal);
  };

  useEffect(() => {
    fetch("http://localhost:3000/users")
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
    fetch("http://localhost:3000/users", {
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
          MaKH: "",
          name: "",
          phonenumber: "",
          email: "",
          address: "",
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  // Hàm xử lý xóa khách hàng
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setCustomers(customers.filter((user) => user.MaKH !== id));
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
    fetch(`http://localhost:3000/users/${editUser.MaKH}`, {
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
          customers.map((user) => (user.MaKH === editUser.MaKH ? data : user))
        );
        setEditMode(false);
        setEditUser(null);
        setNewusers({
          MaKH: "",
          name: "",
          phonenumber: "",
          email: "",
          address: "",
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
      <h2>Bảng Khách Hàng</h2>
      <button onClick={handleOpen} style={{ cursor: "pointer" }}>
        + Khách hàng mới
      </button>
      {openmodal && (
        <form
          onSubmit={editMode ? handleUpdateUser : handleAddUser}
          className="add-customer-form"
        >
          <div className="add-customer-form--body">
            <input
              type="text"
              name="TenKH"
              placeholder="Tên khách hàng"
              value={newusers.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="SDT"
              placeholder="Số điện thoại"
              value={newusers.phonenumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={newusers.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="Diachi"
              placeholder="Địa chỉ"
              value={newusers.address}
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
            <th>TenKH</th>
            <th>SDT</th>
            <th>Email</th>
            <th>Diachi</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user) => (
            <tr key={user.MaKH}>
              <td>{user.MaKH}</td>
              <td>{user.name}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>

              <td>
                <button onClick={() => handleEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user.MaKH)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
