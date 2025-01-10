import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import About from './pages/home/About';
import Clients from './pages/home/Clients';
import Pricing from './pages/home/Pricing';
import Booking from './pages/home/Booking';
import Services from './pages/home/Services';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Footer from './components/Footer';


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth/signin" || location.pathname === "/auth/signup";
  const hideFooter = location.pathname === "/auth/signin" || location.pathname === "/auth/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/service" element={<Services />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
      {!hideFooter && <Footer/>}
    </>
  );
}

export default App;
