import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App, ConfigProvider } from "antd";
import { ContextProvider } from "components/context/app.context";
import Home from "pages/clients/Home";
import Book from "pages/clients/Book";
import About from "pages/clients/About";
import Login from "pages/clients/auth/Login";
import Layout from "@/components/layout/Layout";
import Register from "pages/clients/auth/Register";
import Checkout from "pages/clients/Checkout";
import ProtectedRoute from "components/auth/ProtectedRoute";
import LayoutAdmin from "components/admin/LayoutAdmin";
import DashboardPage from "pages/admin/DashboardPage";
import ManageBookPage from "pages/admin/ManageBookPage";
import ManageOrderPage from "pages/admin/ManageOrderPage";
import ManageUserPage from "pages/admin/ManageUserPage";
import enUS from "antd/locale/en_US";
import "styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={enUS}>
        <App>
          <ContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='books' element={<Book />} />
                <Route path='about' element={<About />} />
                <Route
                  path='checkout'
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path='admin' element={<LayoutAdmin />}>
                <Route index element={<DashboardPage />} />
                <Route path='books' element={<ManageBookPage />} />
                <Route path='orders' element={<ManageOrderPage />} />
                <Route path='users' element={<ManageUserPage />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Routes>
          </ContextProvider>
        </App>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
