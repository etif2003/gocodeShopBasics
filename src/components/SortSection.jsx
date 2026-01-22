import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { FilterSortComp } from "./FilterSortComp";
import CartDrawer from "./CartDrawer";

export const SortSection = () => {
  const { categories, setSelectedCategory, setSortType } =
    useContext(ShopContext);

  const sortOptions = [
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
  ];

  return (
    <>
      <div className="sort">
        <FilterSortComp
          onSelect={setSelectedCategory}
          label={"Filter by:"}
          listOfOptions={categories}
        />
        <FilterSortComp
          onSelect={setSortType}
          label={"Sort by:"}
          listOfOptions={sortOptions}
        />
      </div>
      <CartDrawer />
    </>
  );
};
