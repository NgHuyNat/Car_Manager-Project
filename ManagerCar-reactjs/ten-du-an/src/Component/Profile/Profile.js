import { getCookie } from "../../helper/cookies";
import "./Profile.css";
function Profile() {
  const token = getCookie("token");
  const employeeData = {
    img: "https://th.bing.com/th/id/OIP.QVHuq09v2mLB_3xUgEpOlwHaE8?rs=1&pid=ImgDetMain",
    MaNH: "12345",
    TenNV: "Nguyễn Văn A",
    ChucVu: "Nhân viên bán hàng",
    SDT: "0123456789",
    Email: "nguyenvana@example.com",
    DiaChi: "123 Đường ABC, Quận X, Thành phố Y",
    NgayVaoLam: "2022-01-15",
  };
  return (
    <>
      {token ? (
        <div className="employee-profile">
          <h2>Thông Tin Nhân Viên</h2>
          <div className="profile">
            <img
              className="profile__img"
              src={employeeData.img}
              alt="employee"
            />
            <p>
              <strong>Mã Nhân Viên:</strong> {employeeData.MaNH}
            </p>
            <p>
              <strong>Tên Nhân Viên:</strong> {employeeData.TenNV}
            </p>
            <p>
              <strong>Chức Vụ:</strong> {employeeData.ChucVu}
            </p>
            <p>
              <strong>Số Điện Thoại:</strong> {employeeData.SDT}
            </p>
            <p>
              <strong>Email:</strong> {employeeData.Email}
            </p>
            <p>
              <strong>Địa Chỉ:</strong> {employeeData.DiaChi}
            </p>
            <p>
              <strong>Ngày Vào Làm:</strong> {employeeData.NgayVaoLam}
            </p>
          </div>
        </div>
      ) : (
        alert("Bạn cần phải đăng nhập")
      )}
    </>
  );
}
export default Profile;
