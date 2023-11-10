import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import AppDemo from "@/pages/App.tsx";
import DndTest from "@/pages/DndTest";
import AntdTest from "@/pages/AntdTest";
import NavigatePage from "@/pages/NavigatePage";

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AppDemo />} />
        <Route path="/dnd" element={<DndTest />} />
        <Route path="/antd" element={<AntdTest />} />
        <Route path="/navigate" element={<NavigatePage />} />
        <Route path="/no_auth" element={<div>no auth</div>} />
        <Route path="/*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};
