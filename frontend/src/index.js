import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-tailwind/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

  <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider>
        <App />
        </ThemeProvider>
      </PersistGate>
  </Provider>

  // </React.StrictMode>
);

