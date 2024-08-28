import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import Write from './pages/Write';

function App() {
  const [showAuth, setShowAuth] = useState(true);
  return (
    <>
      <AuthContext.Provider value={{ showAuth, setShowAuth }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/write' element={<Write />} />
            <Route path='/' element={<Blogs />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
