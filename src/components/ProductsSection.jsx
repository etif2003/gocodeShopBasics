import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";
import { useProducts } from "../hooks/useProducts.js";

export const ProductsSection = () => {
  const { data: filteredProducts, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  // const { filteredProducts } = useContext(ShopContext);
  return (
    <section className="products">
      {filteredProducts.map((product) => (
        <ProductCard
          // itemName={product.title}
          // price={product.price}
          // img={product.image}
          // id={product._id}
          product={product}
        />
      ))}
    </section>
  );
};
