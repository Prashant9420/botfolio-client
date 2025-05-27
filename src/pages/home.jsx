import { useAuth } from '../auth/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Botfolio 👋
        </Typography>
        <Typography variant="h6" gutterBottom>
          Create your personalized AI-powered resume bot tailored for each company.
        </Typography>

        <Box sx={{ mt: 4 }}>
          {user ? (
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              color="primary"
              size="large"
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
                size="large"
              >
                Get Started
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
