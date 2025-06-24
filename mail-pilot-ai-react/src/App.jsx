import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopySuccess(true);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
      py: 6,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      <Box sx={{
        width: '100%',
        maxWidth: '1100px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
        borderRadius: 4,
        p: { xs: 3, md: 6 },
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src="https://res.cloudinary.com/dw6mns230/image/upload/v1750799051/Mail_Pilot_Ai_q1yfjf.png"
            alt="Mail Pilot AI Logo"
            style={{ width: '200px', height: '80px' }}
          />
        </Box>

        <Typography variant='h3' sx={{ color: '#0d47a1', fontWeight: 'bold', mb: 2 }}>
          Mail Pilot AI
        </Typography>

        <Typography variant='h6' color="text.secondary" sx={{ mb: 4 }}>
          Generate context-aware, professional, friendly, or casual replies instantly using AI ✨
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: '#f0f4f8',
            borderRadius: 2
          }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
            color: '#fff',
            transition: '0.3s',
            '&:hover': {
              background: 'linear-gradient(90deg, #2af598 0%, #009efd 100%)',
              transform: 'scale(1.02)'
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "🚀 Generate Reply"}
        </Button>

        {error && (
          <Typography color='error' sx={{ mt: 3 }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ mt: 5, textAlign: 'left' }}>
            <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              ✉️ Your AI-Generated Reply:
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={generatedReply}
              inputProps={{ readOnly: true }}
              sx={{
                mb: 3,
                backgroundColor: '#e8f5e9',
                borderRadius: 2
              }}
            />

            <Button
              variant='outlined'
              color='success'
              fullWidth
              onClick={handleCopy}
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#d0f0d6'
                }
              }}
            >
              📋 Copy to Clipboard
            </Button>
          </Box>
        )}
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Reply copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
1