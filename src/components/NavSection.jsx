import RangeSlider from "./RangeSlider";
import { SortSection } from "./SortSection";

export const NavSection = () => {
  return (
    <nav className="product-filter">
      <h1>Jackets</h1>
      <div className="filter-section">
        <SortSection />
        <RangeSlider />
      </div>
    </nav>
  );
};
