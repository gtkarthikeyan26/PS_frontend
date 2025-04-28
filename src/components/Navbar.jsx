import { Link } from "react-router-dom";
import { PlusSquare } from "react-feather";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import "./Navbar.css";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={darkMode ? 'dark-mode' : ''}>
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">The Supply Stop</Link>
        </h1>

        <div className="navbar-buttons">
          <Link to="/create" className="navbar-button">
            <PlusSquare size={20} />
          </Link>
          <button onClick={toggleDarkMode}>
        {darkMode ? <LuSun /> : <IoMoon />}
      </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;