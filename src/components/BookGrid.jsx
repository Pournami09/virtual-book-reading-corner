import { useState } from 'react';
import BookCard from './BookCard';
import { Filter, Grid, List } from 'lucide-react';

const BookGrid = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Sample book data - in a real app, this would come from an API
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      rating: 4,
      duration: "4h 32m",
      genres: ["Classic", "Fiction"],
      progress: 0
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      rating: 5,
      duration: "6h 15m",
      genres: ["Classic", "Drama"],
      progress: 45
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      rating: 5,
      duration: "5h 48m",
      genres: ["Dystopian", "Fiction"],
      progress: 0
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      rating: 4,
      duration: "7h 12m",
      genres: ["Romance", "Classic"],
      progress: 0
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      rating: 4,
      duration: "4h 55m",
      genres: ["Coming-of-age", "Fiction"],
      progress: 0
    },
    {
      id: 6,
      title: "Lord of the Flies",
      author: "William Golding",
      rating: 4,
      duration: "5h 20m",
      genres: ["Allegory", "Fiction"],
      progress: 0
    }
  ];

  const genres = ['all', 'Classic', 'Fiction', 'Drama', 'Dystopian', 'Romance', 'Coming-of-age', 'Allegory'];

  const filteredBooks = selectedGenre === 'all' 
    ? books 
    : books.filter(book => book.genres.includes(selectedGenre));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-handwriting text-amber-100 font-bold mb-2">
            Your Library
          </h2>
          <p className="text-amber-300">
            {filteredBooks.length} books in your collection
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Genre Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-amber-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-amber-800/20 border border-amber-600/30 rounded-lg px-3 py-2 text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-amber-800">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-amber-800/20 rounded-lg p-1 border border-amber-600/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-amber-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-amber-100 mb-2">
            No books found
          </h3>
          <p className="text-amber-300">
            Try adjusting your filters or add some books to your library.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookGrid;
