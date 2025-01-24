import React from 'react';
import AppProvider from "./store/appProvider.tsx"; // Assuming AppProvider is the context provider
import LoginPage from './pages/LoginPage.tsx';
import Router from './Router.tsx';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router/>
    </AppProvider>
  );
};

export default App;
