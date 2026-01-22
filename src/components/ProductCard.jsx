import { AddToCart } from "./AddToCart";
import { ShopContext } from "../ShopContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {

  const navigate = useNavigate();
  const handleClickImage = () => navigate(`/products/${props.product.id}`);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={props.product.image} onClick={()=>handleClickImage()} />
      </div>
      <div>
        <AddToCart
          // itemId={props.id}
          // itemName={props.itemName}
          // price={product.price}
          product={props.product}
        />
      </div>
      <div className="product-info">
        {/* <h5>{props.itemName}</h5>
        <h6>{props.price}</h6> */}
        <h5>{props.product.itemName}</h5>
        <h6>{props.product.price}$</h6>
      </div>
    </div>
  );
};
