import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Button,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  LightMode,
  DarkMode
} from '@mui/icons-material';
import { bookService } from '../services/bookService';

const Header = ({ onLibraryUpdate, onSearchClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setRecentSearches(bookService.getRecentSearches());
  }, []);

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'rgba(254, 247, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(103, 80, 164, 0.12)',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: isMobile ? 1 : 0 }}>
          <Avatar
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              boxShadow: '0px 2px 8px rgba(103, 80, 164, 0.3)'
            }}
          >
            📚
          </Avatar>
          <Typography 
            variant="h6" 
            component="h1"
            sx={{ 
              fontWeight: 500,
              color: 'text.primary',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Vibe Book Library
          </Typography>
        </Box>

        {/* Search Button - Center on mobile */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          mx: isMobile ? 0 : 4
        }}>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={onSearchClick}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              px: 3,
              py: 1,
              minWidth: isMobile ? 200 : 300,
              borderColor: 'primary.main',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
                color: 'primary.dark'
              }
            }}
          >
            Search books, authors, genres...
          </Button>
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => setIsDarkMode(!isDarkMode)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.dark'
              }
            }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          
          <IconButton
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.dark'
              }
            }}
            aria-label="User profile"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;