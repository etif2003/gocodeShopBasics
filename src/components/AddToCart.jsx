import { useState } from "react";

export const AddToCart = (props) => {
  const { onClickAddBtn, itemId, itemName } = props;
  const [count, setCount] = useState(0);

  return (
    <div className="addToCartBtns">
      <button
        disabled={count <= 0}
        onClick={() => {
          onClickAddBtn("-", itemId, itemName, setCount);
        }}
        className="cartBtn"
      >
        -
      </button>
      <p>{count}</p>
      <button
        onClick={() => onClickAddBtn("+", itemId, itemName, setCount)}
        className="cartBtn"
      >
        +
      </button>
    </div>
  );
};
