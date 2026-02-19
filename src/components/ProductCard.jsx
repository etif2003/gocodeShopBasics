import { AddToCart } from "./AddToCart";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleClickImage = () => navigate(`/products/${props.product._id}`);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={props.product.image} onClick={() => handleClickImage()} />
      </div>
      <div>
        <AddToCart product={props.product} />
      </div>
      <div className="product-info">
        <h5>{props.product.title}</h5>
        <h6>{props.product.price}$</h6>
      </div>
    </div>
  );
};
