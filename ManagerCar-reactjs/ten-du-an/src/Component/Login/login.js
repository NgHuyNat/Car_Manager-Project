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
    const username = e.target[0].value;
    const password = e.target[1].value;
    const respon = await login(username, password);
    if (respon.length > 0) {
      console.log("aaaaaa"+respon);
      
      setCookie("username", username, 1);
      setCookie("password", password, 1);
      localStorage.setItem("user", JSON.stringify(respon));
      
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
            <input className="input_user" type="text" name="username" placeholder="Username" />
            <input className="input_pass" type="password" name="password" placeholder="Password" />

            <div className="register-form--btn">
              <button type="submit" className="btn">
                Đăng nhập
              </button>
              <NavLink to="/">
              {" "}
                <button onClick={handleClose} type="close" className="btn-close">
                    Close
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
