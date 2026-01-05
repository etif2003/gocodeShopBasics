import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";

export const ProductsSection = () => {
  const { filteredProducts } = useContext(ShopContext);
  return (
    <section className="products">
      {filteredProducts.map((product) => (
        <ProductCard
          itemName={product.title}
          price={product.price}
          img={product.image}
          id={product.id}
        />
      ))}
    </section>
  );
};
