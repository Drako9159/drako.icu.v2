import DashboardMain from "../components/Dashboard/DashboardMain";
import DashboardNav from "../components/Dashboard/DashboardNav";
import { useState } from "react"
export default function Dashboard() {
    const [element, setElement] = useState("Posts");
  return (
    <>
      <DashboardNav setElement={setElement} element={element}/>
      <DashboardMain setElement={setElement} element={element}/>
    </>
  );
}
