import React, { useContext, useEffect } from 'react';
import { BeansContext } from '../context/BeansContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Cart.css';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(BeansContext);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="main-content">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Cart</h2>
        </div>
        {cartItems.length === 0 ? (
          <p className="cart-empty-message">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <Card key={item.id} className="cart-item-card">
                  <Card.Img variant="top" src="https://as2.ftcdn.net/v2/jpg/05/42/33/31/1000_F_542333113_NEfgLqUS8BNgmkKrO4ViJb1cqcBAJNAf.jpg" className="cart-item-image" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="cart-summary">
              <p className="cart-total">Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
              <Button className="checkout-button">Checkout</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
