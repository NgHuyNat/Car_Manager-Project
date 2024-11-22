import React, { useEffect, useState } from "react";
import "./user.css";

function Users() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newusers, setNewusers] = useState({
    id: "",
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
    fetch("http://localhost:8081/customer")
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
    fetch("http://localhost:8081/customer/addcustomer", {
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
          phonenumber: "",
          email: "",
          address: "",
        });
        setmodal(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/customer/deletecustomer/${id}`, {
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

  const handleEdit = (user) => {
    setEditMode(true);
    setEditUser(user);
    setNewusers(user);
    setmodal(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/customer/updatecustomer/${editUser.id}`, {
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
        setEditUser(null);
        setEditMode(false);
        setNewusers({
          id: "",
          name: "",
          phonenumber: "",
          email: "",
          address: "",
        });
        setmodal(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="customer-table">
      <h2>Thông Tin Khách Hàng</h2>
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
              name="name"
              placeholder="Tên khách hàng"
              value={newusers.name}
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
              type="email"
              name="email"
              placeholder="Email"
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>

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

export default Users;
