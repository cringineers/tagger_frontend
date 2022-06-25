import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

console.log(process.env.REACT_APP_S3_BUCKET);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);