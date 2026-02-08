import { Navigate, Outlet } from "react-router-dom";
import TokenValidationTime  from "./TokenValidationTime";

function ProtectionRoute(){
  const token = localStorage.getItem("token");
  const isAuthorized = token && TokenValidationTime(token);

  return isAuthorized ? <Outlet/> : <Navigate to="/login" replace ></Navigate>;
}

export default ProtectionRoute;
