import "./Registration.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import { checkExit } from "../../services/userService";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { generratedToken } from "../../helper/generatetoken";
import { register } from "../../services/userService";
function Registration() {
  const [registermodal, setregister] = useState();
  const handleClose = () => {
    setregister(false);
  };
  const handleregister = () => {
    setregister(true);
  };
  const navigate = useNavigate();
  const handlechange = () => {
    navigate("/login2");
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkExitemail = await checkExit("email", email);
    if (checkExitemail.length > 0) {
      alert("Email đã tồn tại");
    }
    const options = {
      fullName: fullName,
      email: email,
      password: password,
      token: generratedToken(),
    };
    const response = await register(options);
    if (response) {
      console.log(response);
      dispatch(checkLogin(true));
      navigate("/login2");
    } else {
      alert("Đăng ký thất bại");
    }
  };
  return (
    <>
      {/* <div onClick={handleregister}>Đăng ký</div> */}
      {/* {registermodal && ()} */}
      <div className="general">
        <div className="register-form">
          <h2>Đăng ký</h2>
          <form onSubmit={handleSubmit} action="" method="POST">
            <input
              type="fullName"
              name="username"
              placeholder="Nhập họ và tên"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
            />
            <button type="submit" className="btn">
              Register
            </button>
            <NavLink to="/">
              <button onClick={handleClose} type="close" className="btn-close">
                Close
              </button>
            </NavLink>
            <p onClick={handlechange} className="btn-text">
              Bạn đã có tài khoản
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default Registration;
