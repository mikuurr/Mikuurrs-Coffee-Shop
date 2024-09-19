import React, { useState, useEffect, useContext } from 'react';
import BeansFinder from '../apis/BeansFinder';
import { BeansContext } from '../context/BeansContext';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './BeansList.css';

console.log('BeansList component rendered');

const BeansList = () => {
  const { beans, setBeans, addToCart, authenticated, setAuthenticated } = useContext(BeansContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    console.log("Fetching beans data...")

    const fetchData = async () => {
      try {
        const response = await BeansFinder.apiInstance.get("/api/beans");
        console.log('Response data:', response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setBeans(response.data.data);
        } else {
          console.error('Unexpected response structure', response);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setAuthenticated(true);
    }
  }, [setBeans, setAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'username' && password === 'password') {
      setAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setAuthenticated(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (!authenticated) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  if (!Array.isArray(beans)) {
    return <div>Error loading beans data.</div>;
  }

  console.log(beans)

  return (
    <div className="beans-list-container">
      <div className="beans-cards-container">
        {beans.map(bean => (
          <Col key={bean.id} className="bean-col">
            <Card className="bean-card" onClick={() => toggleExpand(bean.id)}>
              <Card.Img variant="top" className="bean-image" src="https://as2.ftcdn.net/v2/jpg/05/42/33/31/1000_F_542333113_NEfgLqUS8BNgmkKrO4ViJb1cqcBAJNAf.jpg" />
              <Card.Body className="text-center">
                <Card.Title className="bean-title">{bean.name}</Card.Title>
                {expandedCard === bean.id && (
                  <Card.Text className="bean-description">
                    {bean.description}
                  </Card.Text>
                )}
                <Button variant="primary" onClick={(e) => { e.stopPropagation(); addToCart(bean); }}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default BeansList;
