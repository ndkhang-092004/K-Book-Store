import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "antd";
import "styles/global.scss";
import Home from "pages/clients/Home";
import Book from "pages/clients/Book";
import About from "pages/clients/About";
import Login from "pages/clients/auth/Login";
import Layout from "@/Layout";
import Register from "pages/clients/auth/Register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='books' element={<Book />} />
            <Route path='about' element={<About />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);
