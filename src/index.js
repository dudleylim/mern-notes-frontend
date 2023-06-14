import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoteContextProvider } from './context/NoteContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);