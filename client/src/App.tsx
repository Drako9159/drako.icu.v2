import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout/Layout";
import Wrapper from "./components/Layouts/Wrapper/Wrapper";
import ScrollTopTop from "./hooks/useScroll";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/Layouts/404NotFound/404NotFound";

export default function App() {
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
        <ScrollTopTop />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
