// src/AppWrapper.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';  // Assuming App is the main app component

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

