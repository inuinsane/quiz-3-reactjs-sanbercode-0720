import React from 'react';
import './App.css';
import Routes from './components/Router/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
