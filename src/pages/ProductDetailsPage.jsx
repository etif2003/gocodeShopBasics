import { Link, useParams } from "react-router";
import { ShopContext } from "../ShopContext.js";
import { useContext } from "react";
import { fetchSingleProduct } from "../api/products-functions.js";
import { useQuery } from "@tanstack/react-query";

export const ProductDetailsPage = () => {
  // const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  // const product = allProducts.find((p) => p.id === +productId);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
  });

  if (isLoading) return <div>Loading product details...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div>
      <div className="link-back">
        <Link to={"/"}> {"< Back to Homepage"}</Link>
      </div>
      <div className="product-card-page">
        <div className="product-card-details">
          <h1 className="bold-title">{product.title}</h1>
          <h1>{product.price} $</h1>
          <p>{product.description}</p>
          <span>
            <p className="bold-title">Category:</p>
            <p> {product.category}</p>
          </span>
        </div>
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
};

// {Object.entries(product).map(([key, value]) => {
//   if (typeof value === "object" || key === "image") return null;
//   return (
//     <div key={key} className="productPageDetails">
//       <p>{key}:</p> <b>{String(value)}</b>
//     </div>
//   );
// })}
