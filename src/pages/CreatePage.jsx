import { useState } from "react";
import { useProductStore } from "../store/product";
import "./CreatePage.css";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    
    // Simple toast replacement
    const toast = document.createElement("div");
    toast.className = `toast ${success ? "success" : "error"}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };
  
  return (
    <div className="create-page-container">
      <div className="create-page-content">
        <h1 className="create-page-title">Create New Product</h1>

        <div className="create-page-form">
          <div className="form-group">
            <input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="form-input"
            />
          </div>

          <button onClick={handleAddProduct} className="submit-button">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;