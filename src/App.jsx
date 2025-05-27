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

function App() {
  return (
    <>
    <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bot/:id" element={<ViewBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBot />} />
          <Route path="/edit-bot/:id" element={<EditBot />} />
          <Route path="/view-bot/:id" element={<ViewBot />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
