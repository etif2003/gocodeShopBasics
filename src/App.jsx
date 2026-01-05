// import { useRef } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { ShopContext } from "./ShopContext.js";
import { NavSection } from "./components/NavSection";
import { ProductsSection } from "./components/ProductsSection";

function App() {
  // const inputRef = useRef(null);

  // const handleClick = () => {
  //   inputRef.current.focus();
  //   inputRef.current.style.background = "red";
  //   inputRef.current.style.width = "200px";
  //   inputRef.current.style.height = "100px";
  // };
  return (
    <>
      {/* <button onClick={handleClick}>click me for focusing the input</button>
      <input ref={inputRef} />
      */}
      <NavSection />
      <ProductsSection />
    </>
  );
}

export default App;
