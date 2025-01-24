
import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom' yerine 'react-dom/client' kullanmalısın
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot kullan
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);