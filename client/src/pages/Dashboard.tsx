import DashboardMain from "../components/Dashboard/DashboardMain";
import DashboardNav from "../components/Dashboard/DashboardNav";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import DashboardLogin from "../components/Dashboard/login/DashboardLogin";
import ToastNotify from "../components/Dashboard/toast/ToastNotify";
import { useToastStore } from "../store/toastNotify";

export default function Dashboard() {
  const auth = useAuthStore((state) => state.profile);
  const setNotify = useToastStore((state) => state.setNotify);

  const [element, setElement] = useState("Posts");
  const [role, setRole] = useState(auth.role);

  useEffect(() => {
    setRole(auth.role);
  }, [auth.role]);

  useEffect(() => {
    setNotify({ color: "blue", message: "Welcome, please login" });
  }, []);

  return role !== "admin" ? (
    <>
      <ToastNotify />
      <DashboardLogin />
    </>
  ) : (
    <>
      <ToastNotify />
      <DashboardNav setElement={setElement} element={element} />
      <DashboardMain setElement={setElement} element={element} />
    </>
  );
}
