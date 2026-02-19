import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { ShopContext } from "../ShopContext.js";
import { useProducts } from "../hooks/useProducts.js";
import { Loading } from "./Loading.jsx";
import { LoadError } from "./LoadError.jsx";

export const ProductsSection = () => {
  const { data: filteredProducts, isLoading, isError } = useProducts();

  if (isLoading) return <Loading text="Loading products..." />;
  if (isError) return <LoadError text="Error loading products" />;

  return (
    <section className="products">
      {filteredProducts.map((product) => (
        <ProductCard product={product} />
      ))}
    </section>
  );
};
