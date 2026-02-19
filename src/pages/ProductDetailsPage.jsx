import { Link, useParams } from "react-router";
import { ShopContext } from "../ShopContext.js";
import { useContext } from "react";
import { fetchSingleProduct } from "../api/products-functions.js";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components/Loading.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadError } from "../components/LoadError.jsx";

export const ProductDetailsPage = () => {
  const { productId } = useParams();

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

  if (isLoading) return <Loading text="Loading product details..." />;
  if (isError)
    return (
      <LoadError text={`Error: ${error?.message || "Something went wrong"}`} />
    );

  if (!product) return <div>No product found.</div>;

  return (
    <div>
      <div className="link-back">
        <Link to={"/"}>
          <ArrowBackIcon className="link-back-home" />
        </Link>
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
