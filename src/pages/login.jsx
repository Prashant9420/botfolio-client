import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useAuth } from '../auth/AuthContext.jsx';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f2f5',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: 5, maxWidth: 400, width: '100%', borderRadius: 3 }}
      >
        <Typography variant="h4" component="h1" mb={4} textAlign="center" fontWeight="bold">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
            value={formData.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
