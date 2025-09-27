import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Search as SearchIcon, MenuBook, CheckCircle, PlayCircle } from '@mui/icons-material';
import Book3DEnhanced from './Book3DEnhanced';
import PlantDecoration from './PlantDecoration';
import { libraryService } from '../services/libraryService';

const Bookshelf = ({ onBookSelect, onSearchClick }) => {
  const [books, setBooks] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = () => {
    const libraryBooks = libraryService.getBooks();
    setBooks(libraryBooks);
  };

  const handleBookSelect = (book) => {
    onBookSelect?.(book);
  };

  const stats = [
    {
      label: 'Total Books',
      value: books.length,
      icon: <MenuBook />,
      color: 'primary'
    },
    {
      label: 'Books Read',
      value: books.filter(book => book.isRead).length,
      icon: <CheckCircle />,
      color: 'success'
    },
    {
      label: 'In Progress',
      value: books.filter(book => book.readingProgress > 0 && book.readingProgress < 100).length,
      icon: <PlayCircle />,
      color: 'warning'
    }
  ];

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: '4xl', mx: 'auto', px: 2 }}>
      {/* Welcome Section */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 8, pt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 400,
                color: 'text.primary',
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Welcome to your cozy reading corner, Poro
            </Typography>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onSearchClick}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                boxShadow: '0px 2px 8px rgba(103, 80, 164, 0.3)',
                '&:hover': {
                  boxShadow: '0px 4px 12px rgba(103, 80, 164, 0.4)',
                }
              }}
            >
              Search Books
            </Button>
          </Box>
        </Box>
      </Fade>

      {/* Bookshelf Container */}
      <Fade in timeout={1000}>
        <Box sx={{ position: 'relative', mb: 8 }}>
          {/* Bookshelf Base */}
          <Box
            sx={{
              position: 'relative',
              background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 100%)',
              borderRadius: '12px 12px 0 0',
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '2xl',
              mx: 'auto',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.3) 0%, transparent 50%, rgba(139, 69, 19, 0.3) 100%)',
                borderRadius: '12px 12px 0 0'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '8px',
                left: '12px',
                right: '12px',
                height: '2px',
                background: 'rgba(160, 82, 45, 0.3)',
                borderRadius: '1px'
              }
            }}
          >
            {/* Wood grain lines */}
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  top: `${4 + i * 8}px`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(139, 69, 19, 0.2)',
                  opacity: 0.6
                }}
              />
            ))}
          </Box>

          {/* Books Container */}
          <Box
            sx={{
              position: 'absolute',
              top: -192,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'end',
              gap: 0.5
            }}
          >
            {books.length > 0 ? (
              books.slice(0, 5).map((book, index) => (
                <Book3DEnhanced 
                  key={book.id} 
                  book={book} 
                  index={index}
                  onClick={() => handleBookSelect(book)}
                />
              ))
            ) : (
              <Card sx={{ 
                minWidth: 200, 
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(103, 80, 164, 0.12)'
              }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Your bookshelf is empty
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    Search for books above to add them to your library
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Plant Decoration */}
          <Box sx={{ position: 'absolute', top: -24, right: { xs: 2, md: 4 } }}>
            <PlantDecoration />
          </Box>
        </Box>
      </Fade>

      {/* Library Statistics */}
      <Fade in timeout={1200}>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={stat.label}>
                <Card
                  sx={{
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(103, 80, 164, 0.12)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 24px rgba(103, 80, 164, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <Box sx={{ 
                        color: `${stat.color}.main`,
                        mr: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default Bookshelf;