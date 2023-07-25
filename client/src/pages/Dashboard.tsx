import DashboardMain from "../components/Dashboard/DashboardMain";
import DashboardNav from "../components/Dashboard/DashboardNav";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import DashboardLogin from "../components/Dashboard/login/DashboardLogin";
export default function Dashboard() {
  const auth = useAuthStore((state) => state.profile);
  //const isAuth = useAuthStore((state) => state.isAuth)
  const [element, setElement] = useState("Posts");
  const [role, setRole] = useState(auth.role)
  

  useEffect(() => {
    setRole(auth.role)
  }, [auth.role]);

  if (role !== "admin") return <DashboardLogin />;

  return (
    <>
      <DashboardNav setElement={setElement} element={element} />
      <DashboardMain setElement={setElement} element={element} />
    </>
  );
}
