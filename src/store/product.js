import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("[DEBUG] Backend URL:", import.meta.env.VITE_BACKEND_URL);
export const useProductStore = create((set) => ({
  products: [],
  
  // Simple setter to update products array directly
  setProducts: (products) => set({ products }),
  
  // Create a new product
  createProduct: async (newProduct) => {
    try {
      // Validate required fields
      if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields." };
      }
      
      // Axios POST request
      const { data } = await axios.post(`${API_BASE_URL}/api/products`, newProduct);
      
      // Update local state
      set((state) => ({ products: [...state.products, data.data] }));
      
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      // Handle errors
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to create product" 
      };
    }
  },
  
  // Fetch all products
  fetchProducts: async () => {
    try {
      // Axios GET request
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      
      // Update local state
      set({ products: data.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // You might want to handle this error in your UI
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to fetch products" 
      };
    }
  },
  
  // Delete a product
  deleteProduct: async (pid) => {
    try {
      // Axios DELETE request
      const { data } = await axios.delete(`${API_BASE_URL}/api/products/${pid}`);
      
      // Update UI immediately
      set((state) => ({ 
        products: state.products.filter((product) => product._id !== pid) 
      }));
      
      return { success: true, message: data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to delete product" 
      };
    }
  },
  
  // Update a product
  updateProduct: async (pid, updatedProduct) => {
    try {
      // Axios PUT request
      const { data } = await axios.put(`${API_BASE_URL}/api/products/${pid}`, updatedProduct);
      
      // Update local state
      set((state) => ({
        products: state.products.map((product) => 
          product._id === pid ? data.data : product
        ),
      }));
      
      return { success: true, message: data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Failed to update product" 
      };
    }
  },
}));