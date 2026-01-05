import { Link, useParams } from "react-router";
import { ShopContext } from "../ShopContext.js";
import { useContext } from "react";

export const ProductDetailsPage = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProducts.find((p) => p.id === +productId);

  return (
    <div>
      <div className="link-back"><Link to="/"> {"< HOME"}</Link></div>
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
        <img src={product.image} />
      </div>
    </div>
  );
};
