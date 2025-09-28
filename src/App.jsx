import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { materialTheme } from './theme/materialTheme';
import Header from './components/Header'
import Bookshelf from './components/Bookshelf'
import StickyNote from './components/StickyNote'
import SearchPage from './pages/SearchPage'
import ReadingSessionPage from './pages/ReadingSessionPage'
import './App.css'

function App() {
  const [libraryUpdateTrigger, setLibraryUpdateTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState('library'); // 'library', 'search', 'reading'
  const [selectedBook, setSelectedBook] = useState(null);

  const handleLibraryUpdate = () => {
    setLibraryUpdateTrigger(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setCurrentPage('search');
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setCurrentPage('reading');
  };

  const handleBackToLibrary = () => {
    setCurrentPage('library');
    setSelectedBook(null);
  };

  const handleAddBook = (book) => {
    handleLibraryUpdate();
    setCurrentPage('library');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage onBack={handleBackToLibrary} onAddBook={handleAddBook} />;
      case 'reading':
        return <ReadingSessionPage book={selectedBook} onBack={handleBackToLibrary} />;
      default:
        return (
          <>
            <Box component="main" sx={{ py: 4 }}>
              <Bookshelf key={libraryUpdateTrigger} onBookSelect={handleBookSelect} onSearchClick={handleSearchClick} />
            </Box>
            <StickyNote />
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: '#ffffff',
          backgroundImage: 
            'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundAttachment: 'fixed'
        }}
      >
        {renderCurrentPage()}
      </Box>
    </ThemeProvider>
  )
}

export default App
