import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoundsContextProvider } from './context/RoundsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoundsContextProvider>
    <App />
    </RoundsContextProvider>
  </React.StrictMode>
);
