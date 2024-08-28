import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import Publish from './pages/Publish';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/blog/:id'
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path='/blogs'
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route path='/publish' element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
