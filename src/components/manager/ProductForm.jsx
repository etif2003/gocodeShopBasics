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

const emptyForm = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rate: "",
    count: "",
};

export default function ProductForm({ open, mode, initialProduct, onClose, onSubmit }) {
    const isEdit = mode === "edit";

    const [form, setForm] = React.useState(emptyForm);

    React.useEffect(() => {
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

    const setField = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

    const handleSubmit = () => {
        // ולידציה בסיסית
        if (!form.title.trim()) return alert("Title is required");
        const priceNum = Number(form.price);
        if (Number.isNaN(priceNum)) return alert("Price must be a number");

        const payload = {
            title: form.title.trim(),
            price: priceNum,
            description: form.description.trim(),
            category: form.category.trim(),
            image: form.image.trim(),
            rating: {
                rate: form.rate === "" ? undefined : Number(form.rate),
                count: form.count === "" ? undefined : Number(form.count),
            },
        };

        // ניקוי undefined ב-rating כדי לא לשבור שרתים שלא מצפים לזה
        if (payload.rating.rate === undefined && payload.rating.count === undefined) {
            delete payload.rating;
        } else {
            if (payload.rating.rate !== undefined && Number.isNaN(payload.rating.rate)) return alert("Rate must be a number");
            if (payload.rating.count !== undefined && Number.isNaN(payload.rating.count)) return alert("Count must be a number");
        }

        onSubmit(payload);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit ? "Update Product" : "Add Product"}</DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Title" value={form.title} onChange={setField("title")} fullWidth />
                    <TextField label="Price" value={form.price} onChange={setField("price")} fullWidth />
                    <TextField label="Description" value={form.description} onChange={setField("description")} fullWidth multiline minRows={3} />
                    <TextField label="Category" value={form.category} onChange={setField("category")} fullWidth />
                    <TextField label="Image URL" value={form.image} onChange={setField("image")} fullWidth />
                    <Stack direction="row" spacing={2}>
                        <TextField label="Rating Rate" value={form.rate} onChange={setField("rate")} fullWidth />
                        <TextField label="Rating Count" value={form.count} onChange={setField("count")} fullWidth />
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
