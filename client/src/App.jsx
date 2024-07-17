import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Cart from './routes/Cart';
import { BeansContextProvider } from './context/BeansContext';
import Header from './components/Header';
import './App.css';

const App = () => {
    return (
        <BeansContextProvider>
            <div className="app-container">
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </Router>
            </div>
        </BeansContextProvider>
    );
};

export default App;