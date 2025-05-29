import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';
import axios from '../utils/axiosInstance.js';

const CreateBot = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    persona: '',
    projectInfo: '',
    education: '',
    experience: '',
    skills: '',
    certifications: '',
    contactInfo: {
      email: '',
      linkedin: '',
      phone: ''
    },
    goals: '',
    boundaries: '',
    llmModel: 'deepseek-ai/DeepSeek-V3'
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['email', 'linkedin', 'phone'].includes(name)) {
      setForm(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const payload = {
      ...form,
      skills: form.skills.split(',').map(skill => skill.trim()),
      certifications: form.certifications.split(',').map(cert => cert.trim())
    };

    try {
      await axios.post('/bots', payload);
      setSuccessOpen(true);
      setForm({
        name: '',
        persona: '',
        projectInfo: '',
        education: '',
        experience: '',
        skills: '',
        certifications: '',
        contactInfo: {
          email: '',
          linkedin: '',
          phone: ''
        },
        goals: '',
        boundaries: ''
      });
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to create bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={700} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" mb={3} textAlign="center">
        Create New Bot
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField name="name" label="Bot Name" placeholder='mybot@Company' value={form.name} onChange={handleChange} fullWidth required margin="normal" />
        <TextField name="persona" label="Persona" value={form.persona} onChange={handleChange} fullWidth multiline rows={3} required margin="normal" />
        <TextField name="projectInfo" label="Project Info" value={form.projectInfo} onChange={handleChange} fullWidth multiline rows={3} required margin="normal" />
        <TextField name="education" label="Education Info" value={form.education} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <TextField name="experience" label="Experience Info" value={form.experience} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <TextField name="skills" label="Skills (comma-separated)" value={form.skills} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="certifications" label="Certifications (comma-separated)" value={form.certifications} onChange={handleChange} fullWidth margin="normal" />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField name="email" label="Email" value={form.contactInfo.email} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField name="linkedin" label="LinkedIn" value={form.contactInfo.linkedin} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField name="phone" label="Phone" value={form.contactInfo.phone} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
        </Grid>

        <TextField name="goals" label="Goals" value={form.goals} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <TextField name="boundaries" label="Boundaries" value={form.boundaries} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <FormControl fullWidth margin='normal'>
          <InputLabel id="demo-simple-select-label">Select LLM Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='llmModel'
            value={form.llmModel}
            label="Select LLM Model"
            onChange={handleChange}
          >
            <MenuItem value="deepseek-ai/DeepSeek-V3">deepseek-ai/DeepSeek-V3</MenuItem>
            <MenuItem value="meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8">meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8</MenuItem>
            <MenuItem value="deepseek-ai/DeepSeek-R1">deepseek-ai/DeepSeek-R1</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 3 }}>
          {loading ? 'Creating...' : 'Create Bot'}
        </Button>
      </form>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Bot created successfully!
        </Alert>
      </Snackbar>

      {errorMsg && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Alert>
      )}
    </Box>
  );
};

export default CreateBot;
