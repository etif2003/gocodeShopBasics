import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Link } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import { ProductDetailsPage } from "./pages/ProductDetailsPage.jsx";
import { Router } from "./Router.jsx";



const root = document.getElementById("root");

createRoot(root).render(<Router />);
