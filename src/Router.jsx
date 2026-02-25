import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { handleProducts } from "./api/products-functions";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./pages/NotFoundPage";
import ManageProductsPage from "./pages/ManageProductsPage";

export const Router = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortType, setSortType] = useState("");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });

  useEffect(() => {
    if (allProducts.length) {
      const prices = allProducts.map((p) => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [allProducts]);

  useEffect(() => {
    const cat = allProducts
      ?.map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (cat && cat.length > 0) {
      cat.unshift("All Items");
      setCategories(cat);
      setSelectedCategory("All Items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  const handleClickBtn = (op, product) => {
    setCart((prevCart) => {
      const item = prevCart.find((p) => p._id === product._id);

      if (op === "+") {
        if (item) {
          return prevCart.map((p) =>
            p._id === product._id ? { ...p, amount: p.amount + 1 } : p,
          );
        } else {
          return [...prevCart, { ...product, amount: 1 }];
        }
      }

      if (op === "-") {
        if (!item) return prevCart;

        return prevCart
          .map((p) =>
            p._id === product._id ? { ...p, amount: p.amount - 1 } : p,
          )
          .filter((p) => p.amount > 0);
      }

      return prevCart;
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/products/:productId",
      Component: ProductDetailsPage,
    },
    {
      path: "/manageProducts",
      Component: ManageProductsPage,
    },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);

  return (
    <ShopContext.Provider
      value={{
        filteredProducts,
        categories,
        setSelectedCategory,
        setPriceRange,
        setSortType,
        selectedCategory,
        priceRange,
        sortType,
        handleClickBtn,
        cart,
        setCart,
      }}
    >
      <RouterProvider router={router} />
    </ShopContext.Provider>
  );
};
