import { deleteAllCookies } from "../helper/cookies";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../actions/login";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/");
  });
  return <></>;
}
export default Logout;
