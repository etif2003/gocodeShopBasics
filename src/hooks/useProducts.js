import { useQuery } from "@tanstack/react-query";
import { transformProducts } from "../utils/product-utils";
import { handleProducts } from "../api/products-functions";
import { ShopContext } from "../ShopContext";
import { useContext } from "react";

export const useProducts = () => {
  const {
    selectedCategory = "",
    priceRange,
    sortType,
  } = useContext(ShopContext);

  return useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
    select: (data) =>
      transformProducts(data, {
        category: selectedCategory,
        priceRange,
        sortType,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
