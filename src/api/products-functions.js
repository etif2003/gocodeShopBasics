export const handleProducts = async () => {
  // const response = await fetch("https://fakestoreapi.com/products");
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();

  return data.map((product) => {
    return { ...product };
  });
};

export const fetchSingleProduct = async (id) => {
  // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const response = await fetch(`http://localhost:3000/api/products/id/${id}`);

  if (!response.ok) throw new Error("Product not found");
  return response.json();
};
