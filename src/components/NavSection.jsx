import RangeSlider from "./RangeSlider";
import { SortSection } from "./SortSection";
import CartDrawer from "./CartDrawer";

export const NavSection = () => {
  return (
    <nav className="product-filter">
      <h1>Products</h1>

      <div className="filter-section">
        <SortSection />
        <RangeSlider />
      </div>
      <div>
        <CartDrawer />
      </div>
    </nav>
  );
};
