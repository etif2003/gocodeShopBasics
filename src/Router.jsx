import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import StickyHeadTable from "./pages/ManageProductsPage";

export const Router = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortType, setSortType] = useState("");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // אחרי כל שינוי בסל
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
    };

    handleProducts();
  }, []);

  useEffect(() => {
    if (products.length) {
      const prices = products.map((p) => p.price);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [products]);

  useEffect(() => {
    const cat = products
      ?.map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);

    if (cat && cat.length > 0) {
      cat.unshift("All Items");
      setCategories(cat);
      setSelectedCategory("All Items");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  //-----------

  useEffect(() => {
    let result = [...products];

    // פילטר קטגוריה
    if (selectedCategory && selectedCategory !== "All Items") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // פילטר מחיר
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // מיון
    if (sortType === "Alphabetically, A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "Alphabetically, Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortType === "Price, low to high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === "Price, high to low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortType]);

  //----------

  // const handleCatChange = (category) => {
  //   if (category === "All Items") {
  //     setFilteredProducts(products);
  //   } else {
  //     setFilteredProducts(products.filter((p) => p.category === category));
  //   }
  // };

  // const handleSortChange = (sort) => {
  //   switch (sort) {
  //     case "Alphabetically, A-Z":
  //       setFilteredProducts((prev) =>
  //         [...prev].sort((a, b) =>
  //           a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  //         )
  //       );
  //       break;

  //     case "Alphabetically, Z-A":
  //       setFilteredProducts((prev) =>
  //         [...prev].sort((a, b) =>
  //           b.title.toLowerCase().localeCompare(a.title.toLowerCase())
  //         )
  //       );
  //       break;

  //     case "Price, low to high":
  //       setFilteredProducts((prev) =>
  //         [...prev].sort((a, b) => a.price - b.price)
  //       );
  //       break;

  //     case "Price, high to low":
  //       setFilteredProducts((prev) =>
  //         [...prev].sort((a, b) => b.price - a.price)
  //       );
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const handleClickBtn = (op, product, setCount) => {
  //   if (op === "-") {
  //     setCount((prev) => (prev > 0 ? prev - 1 : prev));

  //     setCart((prevCart) => {
  //       const item = prevCart.find((p) => p.id === product.id);
  //       if (!item) return prevCart;

  //       return prevCart
  //         .map((p) =>
  //           p.id === product.id ? { ...p, amount: p.amount - 1 } : p
  //         )
  //         .filter((p) => p.amount > 0);
  //     });
  //   } else if (op === "+") {
  //     setCount((prev) => prev + 1);

  //     setCart((prevCart) => {
  //       const item = prevCart.find((p) => p.id === product.id);
  //       if (item) {
  //         return prevCart.map((p) =>
  //           p.id === product.id ? { ...p, amount: p.amount + 1 } : p
  //         );
  //       } else {
  //         return [...prevCart, { ...product, amount: 1 }];
  //       }
  //     });
  //   }
  // };

  const handleClickBtn = (op, product) => {
    setCart((prevCart) => {
      const item = prevCart.find((p) => p.id === product.id);

      if (op === "+") {
        if (item) {
          return prevCart.map((p) =>
            p.id === product.id ? { ...p, amount: p.amount + 1 } : p
          );
        } else {
          return [...prevCart, { ...product, amount: 1 }];
        }
      }

      if (op === "-") {
        if (!item) return prevCart;

        return prevCart
          .map((p) =>
            p.id === product.id ? { ...p, amount: p.amount - 1 } : p
          )
          .filter((p) => p.amount > 0);
      }

      return prevCart;
    });
  };

  // const handleFilterProductsByRange = (range) => {
  //   setFilteredProducts(
  //     filteredProducts.filter(
  //       (p) => (p.price >= range[0]) & (p.price <= range[1])
  //     )
  //   );
  // };

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
      Component: StickyHeadTable,
    },
  ]);

  return (
    <ShopContext.Provider
      value={{
        allProducts: products,
        filteredProducts,
        categories,
        setSelectedCategory,
        setPriceRange,
        setSortType,
        handleClickBtn,
        cart,
      }}
    >
      <RouterProvider router={router} />
    </ShopContext.Provider>
  );
};
