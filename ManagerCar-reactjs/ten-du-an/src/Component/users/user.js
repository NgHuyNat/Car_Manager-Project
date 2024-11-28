import React, { useEffect, useState } from "react";
import "./user.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
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
  const [viewMode, setViewMode] = useState(false); // Chế độ xem thông tin chi tiết
  const [searchTerm, setSearchTerm] = useState(""); // Lưu giá trị tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phonenumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOpen = () => {
    setmodal(!openmodal);
  };

  const handleViewUser = (user) => {
    setEditMode(false); // Tắt chế độ chỉnh sửa
    setViewMode(true); // Bật chế độ xem thông tin chi tiết
    setEditUser(user);
    setmodal(true); // Mở modal
  };

  const handleCloseModal = () => {
    setmodal(false);
    setViewMode(false); // Đóng chế độ xem chi tiết
    setEditMode(false); // Đóng chế độ chỉnh sửa
  };

  useEffect(() => {
    fetch("http://localhost:8080/customer")
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
    fetch("http://localhost:8080/customer/addcustomer", {
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
        fetch(`http://localhost:8080/customer/deletecustomer/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            setCustomers(customers.filter((user) => user.id != id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            setError(error);
          });
      }
    });
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setViewMode(false); // Đóng chế độ xem
    setEditUser(user);
    setNewusers(user);
    setmodal(true); // Mở modal
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/customer/updatecustomer/${editUser.id}`, {
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
        console.log(data);
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
      <button
        className="add-car"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        + Khách hàng mới
      </button>
      <input
        className="search"
        type="text"
        placeholder="Tìm kiếm theo tên hoặc số điện thoại khách hàng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
      />
      {openmodal && (
        <div>
          <form
            onSubmit={editMode ? handleUpdateUser : handleAddUser}
            className="add-customer-form"
          >
            <div className="add-customer-form--body">
              {viewMode ? (
                <div className="add-customer-form--container">
                  <h3>Thông tin chi tiết</h3>
                  <p>
                    <strong>Tên khách hàng:</strong> {editUser?.name}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {editUser?.phonenumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {editUser?.email}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {editUser?.address}
                  </p>
                  <button onClick={handleCloseModal}>Đóng</button>
                </div>
              ) : (
                <>
                  <h3 className="heading">Thêm khách hàng</h3>
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
                    placeholder="Số điện thoại (10 chữ số)"
                    value={newusers.phonenumber}
                    onChange={handleInputChange}
                    pattern="^[0-9]{10}$"
                    title="Số điện thoại phải là 10 chữ số"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newusers.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: "10px",
                      width: "379px",
                    }}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={newusers.address}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">
                    {editMode ? "Cập nhật" : "Thêm"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        // <form onSubmit={editMode ? handleUpdateUser : handleAddUser} className="add-customer-form">
        //   <h3>Thêm khách hàng</h3>
        //     <input
        //  type="text"
        //       name="name"
        //       placeholder="Tên khách hàng"
        //       value={newusers.name}
        //       onChange={handleInputChange}
        //       required
        //     />
        //     <input
        //       type="text"
        //       name="phonenumber"
        //       placeholder="Số điện thoại"
        //       value={newusers.phonenumber}
        //       onChange={handleInputChange}
        //       required
        //     />
        //     <input
        //       type="email"
        //       name="email"
        //       placeholder="Email"
        //       value={newusers.email}
        //       onChange={handleInputChange}
        //       required
        //       style={{
        //         padding:"10px",
        //         width: "379px"
        //       }}
        //     />
        //     <input
        //       type="text"
        //       name="address"
        //       placeholder="Địa chỉ"
        //       value={newusers.address}
        //       onChange={handleInputChange}
        //       required
        //     />
        //     <button type="submit">
        //       {editMode ? "Cập nhật" : "Thêm"}
        //     </button>
        // </form>
      )}

      <table>
        <thead>
          <tr className="list-item">
            <th>ID</th>
            <th>TenKH</th>
            <th>SDT</th>
            <th>Email</th>
            <th>Diachi</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td
                onClick={() => handleViewUser(user)}
                style={{ cursor: "pointer" }}
              >
                {user.name}
              </td>
              <td>{user.phonenumber}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>

              <td className="add_car_button">
                <div className="pen">
                  <img
                    className="add_car_button--items"
                    onClick={() => handleEdit(user)}
                    src="sửa.png"
                  ></img>
                </div>
                <div className="delete">
                  <img
                    className="add_car_button--items"
                    onClick={() => handleDelete(user.id)}
                    src="thùng-rác.png"
                  ></img>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
