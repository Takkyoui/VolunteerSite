import { useState } from "react";

import "./App.css";

import Header from "./components/BasicComponents/Header";
import Footer from "./components/BasicComponents/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
