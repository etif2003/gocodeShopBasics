import RangeSlider from "./RangeSlider";
import { SortSection } from "./SortSection";
import CartDrawer from "./CartDrawer";
import { Link } from "react-router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const NavSection = () => {
  return (
    <nav className="product-filter">
      <h1 className="nav-title">Products</h1>

      <div className="nav-right">
        <RangeSlider />
        <div className="filters">
          <SortSection />
        </div>
        <div className="homeBtns">
          <CartDrawer />
          <Tooltip title="Admin">
            <IconButton
              component={Link}
              to="/manageProducts"
              aria-label="Admin"
            >
              <ManageAccountsIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};
