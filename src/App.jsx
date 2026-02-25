import { useEffect, useState } from "react";
import "./App.css";
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
