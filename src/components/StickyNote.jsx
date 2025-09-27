import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Fade,
  useTheme
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';

const StickyNote = () => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  return (
    <Fade in timeout={1500}>
      <Box
        sx={{
          position: 'fixed',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: { xs: 'none', lg: 'block' }
        }}
      >
        <Paper
          elevation={8}
          sx={{
            position: 'relative',
            width: 200,
            height: 200,
            background: 'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
            borderRadius: '8px 8px 8px 8px',
            transform: isHovered ? 'rotate(5deg) scale(1.05)' : 'rotate(-3deg)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderLeft: '20px solid transparent',
              borderTop: '20px solid #F57F17',
              borderRadius: '0 8px 0 0'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              background: '#D32F2F',
              borderRadius: '50%',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <MenuBook 
              sx={{ 
                fontSize: 32, 
                color: 'text.secondary',
                mb: 1,
                opacity: 0.8
              }} 
            />
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                lineHeight: 1.4,
                fontSize: '0.875rem',
                fontFamily: 'Kalam, cursive'
              }}
            >
              📚 Pick a book from the shelf to start reading
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default StickyNote;