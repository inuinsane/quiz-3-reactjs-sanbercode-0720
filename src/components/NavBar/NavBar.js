import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const [status, setStatus] = useContext(AuthContext);

  const logout = (event) => {
    setStatus(false);
    alert('Anda telah keluar, harap login kembali untuk mengakses movie-list editor');
  }

  return (
    <nav>
      <Link to="/" className="logo link">
        <h3>Quiz 3</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/" className="link">
          <li>Home</li>
        </Link>
        <Link to="/about" className="link">
          <li>About</li>
        </Link>
        {status === true &&
          <Link to="/movie-editor" className="link">
            <li>Movie List Editor</li>
          </Link>
        }
        {status === true &&
          <Link className="link" to='/'>
            <li onClick={logout}>Logout</li>
          </Link>
        }
        {status === false &&
          <Link to="/login" className="link">
            <li>Login</li>
          </Link>
        }
      </ul>
    </nav>
  );
};

export default NavBar;
