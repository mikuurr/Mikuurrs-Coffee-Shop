import React, { useState, createContext } from "react";

export const BeansContext = createContext();

export const BeansContextProvider = (props) => {
    const [beans, setBeans] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const addBeans = (newBeans) => {
        if(isValidBeans(newBeans)) {
            setBeans([...beans, newBeans]);
        } else {
            console.error('InvalidBeans:', newBeans);
        }
    };

    const addToCart = (bean) => {
        const sanitizedBean = sanitizeBean(bean);
        setCartItems([...cartItems, sanitizedBean]);
    };

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const isValidBeans = (beans) => {
        return beans && beans.name && beans.price;
    };

    const sanitizeBean = (bean) => {
        return bean;
    };

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <BeansContext.Provider value={{ 
            beans, 
            setBeans, 
            addBeans, 
            cartItems, 
            setCartItems, 
            addToCart, 
            removeFromCart, 
            authenticated, 
            setAuthenticated, 
            handleLogout 
        }}>
            {props.children}
        </BeansContext.Provider>
    );
};
