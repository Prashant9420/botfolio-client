import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box p={4} textAlign="center">
      <Typography variant="h3" gutterBottom>404</Typography>
      <Typography variant="h6" gutterBottom>Page not found</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Go Home</Button>
    </Box>
  );
};

export default NotFound;