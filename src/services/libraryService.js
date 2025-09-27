// Library service for managing user's book collection
const LIBRARY_STORAGE_KEY = 'vibe_library_books';

export class LibraryService {
  constructor() {
    this.books = this.loadLibrary();
  }

  // Load library from localStorage
  loadLibrary() {
    try {
      const stored = localStorage.getItem(LIBRARY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading library:', error);
      return [];
    }
  }

  // Save library to localStorage
  saveLibrary() {
    try {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(this.books));
    } catch (error) {
      console.error('Error saving library:', error);
    }
  }

  // Add book to library
  addBook(book) {
    // Check if book already exists
    const exists = this.books.some(b => b.id === book.id);
    if (exists) {
      return false; // Book already in library
    }

    // Add book with additional metadata
    const libraryBook = {
      ...book,
      dateAdded: new Date().toISOString(),
      isRead: false,
      readingProgress: 0,
      notes: ''
    };

    this.books.unshift(libraryBook); // Add to beginning
    this.saveLibrary();
    return true;
  }

  // Remove book from library
  removeBook(bookId) {
    const initialLength = this.books.length;
    this.books = this.books.filter(book => book.id !== bookId);
    
    if (this.books.length !== initialLength) {
      this.saveLibrary();
      return true;
    }
    return false;
  }

  // Get all books in library
  getBooks() {
    return [...this.books];
  }

  // Get book by ID
  getBook(bookId) {
    return this.books.find(book => book.id === bookId);
  }

  // Check if book is in library
  hasBook(bookId) {
    return this.books.some(book => book.id === bookId);
  }

  // Update book metadata
  updateBook(bookId, updates) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updates };
      this.saveLibrary();
      return true;
    }
    return false;
  }

  // Mark book as read
  markAsRead(bookId) {
    return this.updateBook(bookId, { isRead: true, readingProgress: 100 });
  }

  // Update reading progress
  updateProgress(bookId, progress) {
    return this.updateBook(bookId, { readingProgress: Math.max(0, Math.min(100, progress)) });
  }

  // Get library statistics
  getStats() {
    const total = this.books.length;
    const read = this.books.filter(book => book.isRead).length;
    const inProgress = this.books.filter(book => book.readingProgress > 0 && book.readingProgress < 100).length;
    
    return {
      total,
      read,
      inProgress,
      unread: total - read - inProgress
    };
  }

  // Clear entire library
  clearLibrary() {
    this.books = [];
    this.saveLibrary();
  }
}

export const libraryService = new LibraryService();

