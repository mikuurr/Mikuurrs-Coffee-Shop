import React from 'react';
import reactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';


const root = reactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);