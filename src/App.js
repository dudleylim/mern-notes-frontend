import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext } from 'react';
import UserContext from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
        <section id='main-content'>
            <Routes>
              <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
        </section>
        </main>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
