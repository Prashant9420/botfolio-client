import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import TypingBalls from '../components/TypingBalls';
import DOMPurify from 'dompurify';

const SharedBot = () => {
  const { id } = useParams();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const res = await axios.get(`/bots/public-bots/${id}`);
        setBot(res.data);
      } catch (err) {
        toast.error('Bot not found or failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchBot();
  }, [id]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setResponding(true);

    try {
      const res = await axios.post(`/chat/shared-chat/${id}`, { message: chatInput });
      const botMessage = { sender: 'bot', text: res.data.reply || 'No reply' };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'bot', text: 'Error responding.' }]);
    } finally {
      setResponding(false);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5, mx: 'auto', display: 'block' }} />;

  if (!bot) return <Typography mt={5} textAlign="center">Bot not found</Typography>;

  return (
    <Box maxWidth="md" mx="auto" p={4}>

      <Typography variant="h5" gutterBottom>Bot shared by {bot.sharedBy.name} ({bot.sharedBy.email})</Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3, minHeight: 200, background: '#f9f9f9' }}>
        {chatHistory.length === 0 ? (
          <Typography color="text.secondary">Start chatting with the bot...</Typography>
        ) : (
          chatHistory.map((msg, idx) => (
            <Box key={idx} sx={{ mb: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <Typography
                variant="body2"
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 1,
                  bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.300',
                  borderRadius: 2,
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text) }}
              >
              </Typography>
            </Box>
          ))
        )}
        {responding && <Box sx={{ mb: 1, textAlign: 'left' }}>
          <TypingBalls />
        </Box>}
      </Paper>

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          placeholder="Type a message"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          disabled={responding || !chatInput.trim()}
          onClick={handleSendMessage}
        >
          {responding ? '...' : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};

export default SharedBot;
