import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const emptyForm = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rate: "",
  count: "",
};

export default function ProductForm({
  open,
  mode,
  initialProduct,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (!open) return;

    if (isEdit && initialProduct) {
      setForm({
        title: initialProduct.title ?? "",
        price: String(initialProduct.price ?? ""),
        description: initialProduct.description ?? "",
        category: initialProduct.category ?? "",
        image: initialProduct.image ?? "",
        rate: String(initialProduct.rating?.rate ?? ""),
        count: String(initialProduct.rating?.count ?? ""),
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, isEdit, initialProduct]);

  const setField = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 letters";
    }

    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Price must be a number greater than 0";
    }

    const rateNum = form.rate === "" ? undefined : Number(form.rate);
    if (
      rateNum !== undefined &&
      (Number.isNaN(rateNum) || rateNum < 0 || rateNum > 10)
    ) {
      newErrors.rate = "Rate must be between 0-10";
    }

    const countNum = form.count === "" ? undefined : Number(form.count);
    if (countNum !== undefined && (Number.isNaN(countNum) || countNum < 0)) {
      newErrors.count = "Count must be a number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      title: form.title.trim(),
      price: priceNum,
      description: form.description.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      rating: {
        rate: rateNum,
        count: countNum,
      },
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Update Product" : "Add Product"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={setField("title")}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="Price"
            type="number"
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
            value={form.price}
            onChange={setField("price")}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={setField("description")}
            multiline
            minRows={3}
          />
          <TextField
            label="Category"
            value={form.category}
            onChange={setField("category")}
          />
          <TextField
            label="Image URL"
            value={form.image}
            onChange={setField("image")}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Rating Rate"
              type="number"
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "+" ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              value={form.rate}
              onChange={setField("rate")}
              error={!!errors.rate}
              helperText={errors.rate}
            />
            <TextField
              label="Rating Count"
              type="number"
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "+" ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              value={form.count}
              onChange={setField("count")}
              error={!!errors.count}
              helperText={errors.count}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
