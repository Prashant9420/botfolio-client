import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const handleDeleteBot = async (botId) => {
    try {
      await axios.delete(`/bots/${botId}`);
      setBots((prev) => prev.filter((bot) => bot._id !== botId));
    } catch (err) {
      toast.error('Error deleting bot:', err);
    }
  }

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await axios.get('/bots');
        setBots(res.data);
      } catch (err) {
        toast.error('Error fetching bots:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Hey {user.name.split(' ')[0]}, Welcome back 👋
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Here's a quick overview of your AI resume bots.
      </Typography>

      <Box my={3}>
        <Button
          variant="contained"
          component={Link}
          to="/create"
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          + Create New Bot
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : bots.length === 0 ? (
        <Typography>No bots found. Start by creating one!</Typography>
      ) : (
        <Grid container spacing={3}>
          {bots.map((bot) => (
            <Grid item xs={12} sm={6} md={4} key={bot._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{bot.name}</Typography>
                  <Typography color="text.secondary" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: 200,
                    }}>
                    {bot.persona || 'Not defined'}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Skills: {bot.skills.join(', ')?bot.skills.length:0}
                  </Typography>
                  <Typography variant="body2">
                    Certificates: {bot.certifications.join(', ')?bot.certifications.length:0}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/view-bot/${bot._id}`}>
                    View
                  </Button>
                  <Button size="small" component={Link} to={`/edit-bot/${bot._id}`}>
                    Edit
                  </Button>
                  <Button size="small" color='error' onClick={()=>handleDeleteBot(bot._id)}> 
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            // <Card
            //   elevation={3}
            //   sx={{
            //     height: 230, // set fixed height
            //     display: 'flex',
            //     flexDirection: 'column',
            //     justifyContent: 'space-between',
            //   }}
            // >
            //   <CardContent>
            //     <Typography variant="h6" noWrap>
            //       {bot.name}
            //     </Typography>
            //     <Typography color="text.secondary" noWrap>
            //       {bot.persona || 'Not defined'}
            //     </Typography>
            //     <Typography variant="body2" mt={1}>
            //       Projects: {bot.projectInfo?.length || 0}
            //     </Typography>
            //     <Typography variant="body2">
            //       Experiences: {bot.experience?.length || 0}
            //     </Typography>
            //   </CardContent>
            //   <CardActions sx={{ mt: 'auto' }}>
            //     <Button size="small" component={Link} to={`/view-bot/${bot._id}`}>
            //       View
            //     </Button>
            //     <Button size="small" component={Link} to={`/edit-bot/${bot._id}`}>
            //       Edit
            //     </Button>
            //     <Button size="small" color="error" onClick={() => handleDeleteBot(bot._id)}>
            //       Delete
            //     </Button>
            //   </CardActions>
            // </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
