import "./layoutdefault.css";
import { NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../helper/cookies.js";
import { useSelector } from "react-redux";
function Layoutdefault() {
  const username = getCookie("username");
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);
  return (
    <>
      <div className="header">
        <div className="header-logo">
          <img src="car.png" alt="logo" className="logo" />
        </div>
        <div className="header-users">
          {username ? (
            <>
              <div className="header-users--avatar">
                <img
                  className="avatar"
                  src="https://png.pngtree.com/png-vector/20230726/ourmid/pngtree-3-raspberry-wallpapers-pictures-free-download-png-image_6750603.png"
                  alt=""
                />{" "}
                <NavLink to="/logout">
                  <div className="Logout">Đăng xuất</div>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="header-users--relog">
                <div className="header-users--register">
                  <NavLink className="register" to="/register">
                    Đăng ký
                  </NavLink>
                </div>
                <div className="header-user-log-in">
                  <NavLink className="Login" to="/login">
                    Đăng nhập
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="index has-tab">
        <div className="tab">
          <ul className="tab-menu">
            <li className="tab-menu--home ">
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li className="tab-menu--cars active">
              <NavLink to="/cars">Quản lý xe</NavLink>
            </li>
            <li className="tab-menu--customs">
              <NavLink to="/users">Khách hàng</NavLink>
            </li>
            <li className="tab-menu--customs">
              <NavLink to="/admin">Nhân viên</NavLink>
            </li>
            <li className="tab-menu--warehouse">
              <NavLink to="/purchase">Hợp đồng </NavLink>
            </li>
            <li className="tab-menu--profile">
              <NavLink to="/profile">Hồ sơ</NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}
export default Layoutdefault;
