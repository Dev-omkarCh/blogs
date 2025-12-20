import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App.tsx';
// import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster
        position='bottom-right'
      />
    </>
  // </StrictMode>,
);
