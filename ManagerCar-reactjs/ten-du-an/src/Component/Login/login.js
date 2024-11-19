// LoginComponent.js
import React, { useState } from "react";
import "./login.css";
import { login } from "../../services/userService";
import { setCookie } from "../../helper/cookies";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

const LoginComponent = () => {
  const [loginmodal, setlogin] = useState(); // Khai báo state login
  const handleClose = () => {
    setlogin(false); // Đóng form đăng nhập
  };
  const handlelogin = async () => {
    setlogin(true); // Mở form đăng nhập
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;
    const respon = await login(email, password);
    if (respon.length > 0) {
      console.log(respon);
      setCookie("id", respon[0].id, 1);
      setCookie("email", respon[0].email, 1);
      setCookie("password", respon[0].password, 1);
      setCookie("token", respon[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <>
      {/* <div onClick={handlelogin}>Đăng nhập</div>
      {loginmodal && ( )} */}
      <div className="general">
        <div className="register-form">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleSubmit} action="" method="POST">
            <input type="text" name="username" placeholder="Username" />

            <input type="password" name="password" placeholder="Password" />

            <button type="submit" className="btn">
              Đăng nhập
            </button>
            <NavLink to="/">
              {" "}
              <button onClick={handleClose} type="close" className="btn-close">
                Close
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
