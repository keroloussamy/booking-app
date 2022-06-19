import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SearchContextProvider>
  </React.StrictMode>,
);