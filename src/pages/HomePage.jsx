import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Check Your List</h1>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty-state">
            No products found 😢{" "}
            <Link to="/create" className="create-link">
              Create a product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;