// import { useRef } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { ShopContext } from "./ShopContext.js";
import { NavSection } from "./components/NavSection";
import { ProductsSection } from "./components/ProductsSection";

function App() {
  return (
    <>
      <NavSection />
      <ProductsSection />
    </>
  );
}

export default App;
