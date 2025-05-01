import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useProductStore } from "../store/product";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
      // Add the open class to trigger overlay fade-in
      setTimeout(() => {
        document.querySelector(".modal-overlay")?.classList.add("open");
      }, 0);  // Instant after the modal state updates
    } else {
      // Delay removing the 'open' class for smooth fade-out
      const timer = setTimeout(() => {
        document.querySelector(".modal-overlay")?.classList.remove("open");
        document.body.classList.remove("modal-open");
      }, 300);  // Match this to the fade duration of overlay
  
      return () => clearTimeout(timer); // Cleanup timer
    }
  
    return () => {
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-overlay")?.classList.remove("open");
    };
  }, [isModalOpen]);
  

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    showToast(success ? "success" : "error", message);
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const updatedData = {
      ...updatedProduct,
      price: parseFloat(updatedProduct.price) // ensure price is a number
    };
    const { success, message } = await updateProduct(pid, updatedData);
    setIsModalOpen(false);
    showToast(success ? "success" : "error", success ? "Product updated successfully" : message);
  };

  const showToast = (type, message) => {
    // Prevent duplicate toasts if one is already showing
    if (document.querySelector(".toast")) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const openModal = () => {
    // Reset form to the latest product info every time modal opens
    setUpdatedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>

        <div className="product-actions">
          <button onClick={openModal} className="action-button edit">
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="action-button delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Product</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                className="modal-button primary"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-button secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
