import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BeansContext } from '../context/BeansContext';
import './Header.css';

const Header = () => {
  const { authenticated, handleLogout } = useContext(BeansContext);

  return (
    <div className="header-container">
      <h1 className="font-weight-light display-1 text-center">Mikuurr's Coffee Shop</h1>
      <div className="header-buttons">
        <Link to="/" className="header-home-button">
          <Button variant="primary">Home</Button>
        </Link>
        <Link to="/cart">
          <Button variant="primary" className="header-button">My Cart</Button>
        </Link>
        {authenticated && (
          <Button variant="danger" onClick={handleLogout} className="header-button">Logout</Button>
        )}
      </div>
    </div>
  );
};

export default Header;