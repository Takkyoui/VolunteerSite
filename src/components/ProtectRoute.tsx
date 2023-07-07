import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../State";

export default function ProtectedRoute() {
  const user = localStorage.getItem("user");
  if (user) {
    return <Outlet></Outlet>;
  } else {
    alert("로그인이 필요합니다");
    return <Navigate to="/signin"></Navigate>;
  }
}
