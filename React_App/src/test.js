import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = () => <h2>Trang chủ</h2>;
const About = () => <h2>Giới thiệu</h2>;
const Contact = () => <h2>Liên hệ</h2>;
const NotFound = () => <h2>404 - Không tìm thấy trang</h2>;

export default function Test() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Trang chủ</Link> | 
        <Link to="/about">Giới thiệu</Link> | 
        <Link to="/contact">Liên hệ</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}