import { useState } from 'react';
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
            <main className="py-8">
              <Bookshelf key={libraryUpdateTrigger} onBookSelect={handleBookSelect} onSearchClick={handleSearchClick} />
            </main>
            <StickyNote />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen cozy-room">
      {renderCurrentPage()}
    </div>
  )
}

export default App
