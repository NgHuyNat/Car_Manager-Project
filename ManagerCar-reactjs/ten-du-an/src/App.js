import Index from "./Component/Index";
import Cars from "./Component/Cars/Cars.js";
import Layoutdefault from "./layout/layoutdefault.js";
import { Route, Routes } from "react-router-dom";
import Error from "./Component/Error 404/Error.js";
import Registration from "./Component/Registration/Registration.js";
import LoginComponent from "./Component/Login/login.js";
import LoginComponent2 from "./Component/Login/login2.js";
import Profile from "./Component/Profile/Profile.js";
import PrivateRouter from "./Component/PrivateRouter/PrivateRouter.js";
import Users from "./Component/users/user.js";
import NhanVien from "./Component/nhanvien/nhanvien.js";
import Logout from "./Logout/Logout.js";
import Purchases from "./Component/Purchase/Purchase.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layoutdefault />}>
          <Route path="/" element={<Index />} />
          <Route path="cars" element={<Cars />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<NhanVien />} />
          <Route element={<PrivateRouter />}> </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/purchase" element={<Purchases />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<Registration />} />
        <Route path="login2" element={<LoginComponent2 />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
