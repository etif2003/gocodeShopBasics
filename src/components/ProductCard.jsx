import { AddToCart } from "./AddToCart";
import { ShopContext } from "../ShopContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const ProductCard = (props) => {
  const { handleClickBtn } = useContext(ShopContext);

  const navigate = useNavigate();
  const handleClickImage = () => navigate(`/products/${props.id}`);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={props.img} onClick={()=>handleClickImage()} />
      </div>
      <div>
        <AddToCart
          onClickAddBtn={handleClickBtn}
          itemId={props.id}
          itemName={props.itemName}
        />
      </div>
      <div className="product-info">
        <h5>{props.itemName}</h5>
        <h6>{props.price}</h6>
      </div>
    </div>
  );
};
