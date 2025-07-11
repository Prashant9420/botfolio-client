import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const EditBot = () => {
  const { id } = useParams(); // get bot id from URL

  const [form, setForm] = useState({
    name: '',
    persona: '',
    projectInfo: '',
    education: '',
    experience: '',
    skills: [],
    certifications: [],
    contactInfo: {
      email: '',
      linkedin: '',
      phone: '',
    },
    goals: '',
    boundaries: '',
    knowledgeBase: '',
    llmModel: ''
  });

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch bot data by ID
  useEffect(() => {
    const fetchBot = async () => {
      try {
        const { data } = await axios.get(`/bots/${id}`);
        setForm({
          ...data,
          skills: data.skills || [],
          certifications: data.certifications || [],
          contactInfo: data.contactInfo || { email: '', linkedin: '', phone: '' },
        });
      } catch (err) {
        setErrorMsg('Failed to fetch bot');
      }
    };

    fetchBot();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nested fields
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value },
      }));
    }
    // Comma-separated arrays
    else if (name === 'skills' || name === 'certifications') {
      setForm(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await axios.put(`/bots/${id}`, form);
      setSuccessOpen(true);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to update bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={700} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" mb={3} textAlign="center">
        Edit Bot
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField label="Bot Name" name="name" value={form.name} onChange={handleChange} fullWidth required margin="normal" />
        <TextField label="Persona" name="persona" value={form.persona} onChange={handleChange} fullWidth required margin="normal" />
        <TextField label="Project Info" name="projectInfo" value={form.projectInfo} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <TextField label="Education Info" name="education" value={form.education} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="Experience Info" name="experience" value={form.experience} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="Skills (comma-separated)" name="skills" value={form.skills.join(', ')} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Certifications (comma-separated)" name="certifications" value={form.certifications.join(', ')} onChange={handleChange} fullWidth margin="normal" />

        <Typography variant="h6" mt={3}>Contact Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Email" name="contactInfo.email" value={form.contactInfo.email} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="LinkedIn" name="contactInfo.linkedin" value={form.contactInfo.linkedin} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Phone" name="contactInfo.phone" value={form.contactInfo.phone} onChange={handleChange} fullWidth margin="normal" />
          </Grid>
        </Grid>

        <TextField label="Goals" name="goals" value={form.goals} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="Boundaries" name="boundaries" value={form.boundaries} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="Knowledge Base" name="knowledgeBase" value={form.knowledgeBase} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
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
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Bot updated successfully!
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

export default EditBot;
