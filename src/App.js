import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { NoteContextProvider } from './context/NoteContext';
import { UserContextProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <UserContextProvider>
    <NoteContextProvider>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
        <section id='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
        </section>
        </main>
        <Footer />
      </BrowserRouter>
    </NoteContextProvider>
    </UserContextProvider>
  );
}

export default App;
