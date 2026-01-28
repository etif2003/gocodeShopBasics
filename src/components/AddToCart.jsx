import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

export const AddToCart = ({ product }) => {
  const { cart, handleClickBtn } = useContext(ShopContext);

  const cartItem = cart.find((p) => p._id === product._id);
  const count = cartItem ? cartItem.amount : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {/* כפתור להפחתה */}
      <IconButton
        size="small"
        disabled={count <= 0}
        onClick={() => handleClickBtn("-", product)}
      >
        <RemoveIcon />
      </IconButton>

      {/* מספר */}
      <span style={{ minWidth: "20px", textAlign: "center" }}>{count}</span>

      {/* כפתור להוספה */}
      <IconButton
        size="small"
        onClick={() => handleClickBtn("+", product)}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};
