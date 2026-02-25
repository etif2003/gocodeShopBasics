// const API_URL = "http://localhost:3000/api/products";
const API_URL = "https://gocodeshopserver.onrender.com/api/products";

export const handleProducts = async () => {
  // const response = await fetch("https://fakestoreapi.com/products");
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.map((product) => {
    return { ...product };
  });
};

export const fetchSingleProduct = async (id) => {
  // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const response = await fetch(`${API_URL}/id/${id}`);

  if (!response.ok) throw new Error("Product not found");
  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error("Failed to add product");
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/id/${id}`, { method: "DELETE" });

  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};
