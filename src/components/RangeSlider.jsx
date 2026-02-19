import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "../api/products-functions";

function rangeValuetext(rangeValue) {
  return `${rangeValue}$`;
}

export default function RangeSlider() {
  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });
  const { setPriceRange } = useContext(ShopContext);


  const prices = allProducts.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1000;

  const [rangeValue, setRangeValue] = useState([minPrice, maxPrice]);

  useEffect(() => {
    if (allProducts.length) {
      setRangeValue([minPrice, maxPrice]);
    }
  }, [allProducts]);

  const handleRangeChange = (event, newRangeValue, activeThumb) => {
    const minDistance = 50;

    if (newRangeValue[1] - newRangeValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newRangeValue[0], maxPrice - minDistance);
        setRangeValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newRangeValue[1], minPrice + minDistance);
        setRangeValue([clamped - minDistance, clamped]);
      }
    } else {
      setRangeValue(newRangeValue);
    }
    setPriceRange(newRangeValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <label>FILTER BY PRICE RANGE:</label>

      <Slider
        min={minPrice}
        max={maxPrice}
        value={rangeValue}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        getAriaValueText={rangeValuetext}
        disableSwap
      />
    </Box>
  );
}
