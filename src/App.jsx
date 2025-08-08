import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import CreateBot from './pages/createBot.jsx';
import ViewBot from './pages/viewBot.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Dashboard from './pages/dashboard.jsx';
import EditBot from './pages/editBot.jsx';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './auth/privateRoute.jsx';
import { Toaster } from 'react-hot-toast';
import SharedBot from './pages/sharedBot.jsx';
import NotFound from './pages/notFound.jsx';

function App() {
  return (
    <>
    <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Removed duplicate public bot view route to avoid unauthorized access */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shared-bot/:id" element={<SharedBot />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBot />} />
          <Route path="/edit-bot/:id" element={<EditBot />} />
          <Route path="/view-bot/:id" element={<ViewBot />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
