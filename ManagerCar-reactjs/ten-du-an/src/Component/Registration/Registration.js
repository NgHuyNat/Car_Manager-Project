import "./Registration.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../services/userService"; // Đảm bảo hàm `register` được export từ userService

function Registration() {
  // State để lưu thông tin form
  const [registermodal, setregister] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleClose = () => {
    setregister(false);
  };

  const navigate = useNavigate();

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Cập nhật đúng trường dữ liệu
    });
  };

  // Hàm xử lý khi người dùng bấm nút Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await register({
        name: formData.fullName,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      console.log("Response from server:", response);

      alert(response);

      if (response === "Đăng ký thành công!") {
        navigate("/login2");
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error.message);
      alert("Đăng ký thất bại: " + error.message);
    }
  };

  return (
    <div className="general">
      <div className="register-form">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            name="fullName"
            placeholder="Nhập họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <div className="register-form--btn">
            <button type="submit" className="btn">
              Register
            </button>
            <NavLink to={"/"}>
              <button onClick={handleClose} type="close" className="btn-closee">
                Close
              </button>
            </NavLink>
          </div>
          <p
            onClick={() => navigate("/login2")}
            className="btn-text"
            style={{ cursor: "pointer" }}
          >
            Bạn đã có tài khoản?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
