import React, { useContext, useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ShopContext } from "../ShopContext";
import { AddToCart } from "./AddToCart";

export default function CartDrawer() {
  const { setCart, cart, handleClickBtn } = useContext(ShopContext);

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const clearCart = () => {
    setCart([]);
    setOpen(false);
    // alert("Payment succeeded");
    setOpenSnackbar(true);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)} className="cartIcon">
        <ShoppingCartIcon />
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message="Payment succeeded"
        onClose={() => setOpenSnackbar(false)}
      />
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">cart ({cart.length})</Typography>

            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          <List sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
            {cart.length === 0 ? (
              <Typography sx={{ textAlign: "center", mt: 5, color: "gray" }}>
                Your cart is empty
              </Typography>
            ) : (
              cart.map((item) => (
                <React.Fragment key={item._id}>
                  <ListItem
                    sx={{ py: 2, display: "flex", alignItems: "center" }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price} x ${item.amount} = $${(
                        item.price * item.amount
                      ).toFixed(2)}`}
                      sx={{ textAlign: "right", px: 2 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <AddToCart product={item} />
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>

          <Box
            sx={{
              height: "15%",
              p: 3,
              bgcolor: "#f9f9f9",
              borderTop: "2px solid #eee",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              {" "}
              <Typography variant="h6">Total Price:</Typography>
              <Typography variant="h6" fontWeight="bold">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1.5, fontSize: "1.1rem" }}
              onClick={clearCart}
              disabled={cart.length<=0}
            >
              Proceed to payment
            </Button>
          </Box>
          {/* סיכום */}
        </Box>
      </Drawer>
    </>
  );
}
