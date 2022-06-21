import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import SharedLayout from './pages/SharedLayout';
import Stats from './pages/Stats';
import AddIssue from './pages/AddIssues';
import AllIssues from './pages/AllIssues';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path='all-issues' element={<AllIssues />}></Route>
            <Route path='add-issue' element={<AddIssue />}></Route>
            <Route path='profile' element={<Profile />}></Route>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
