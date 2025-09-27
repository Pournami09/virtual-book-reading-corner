// Book service for Google Books API integration
const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export class BookService {
  constructor() {
    this.cache = new Map();
    this.recentSearches = this.loadRecentSearches();
  }

  // Search books using Google Books API
  async searchBooks(query, maxResults = 10) {
    if (!query.trim()) return [];

    // Check cache first
    const cacheKey = `search_${query.toLowerCase()}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_API_BASE}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&printType=books`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const books = this.formatBookResults(data.items || []);
      
      // Cache results
      this.cache.set(cacheKey, books);
      
      // Add to recent searches
      this.addToRecentSearches(query);
      
      return books;
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  // Format Google Books API results
  formatBookResults(items) {
    return items.map(item => {
      const volumeInfo = item.volumeInfo || {};
      const imageLinks = volumeInfo.imageLinks || {};
      
      return {
        id: item.id,
        title: volumeInfo.title || 'Unknown Title',
        authors: volumeInfo.authors || ['Unknown Author'],
        description: volumeInfo.description || '',
        publishedDate: volumeInfo.publishedDate || '',
        pageCount: volumeInfo.pageCount || 0,
        categories: volumeInfo.categories || [],
        language: volumeInfo.language || 'en',
        thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || '',
        previewLink: volumeInfo.previewLink || '',
        infoLink: volumeInfo.infoLink || '',
        averageRating: volumeInfo.averageRating || 0,
        ratingsCount: volumeInfo.ratingsCount || 0
      };
    });
  }

  // Add search to recent searches
  addToRecentSearches(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Remove if already exists
    this.recentSearches = this.recentSearches.filter(item => item !== trimmedQuery);
    
    // Add to beginning
    this.recentSearches.unshift(trimmedQuery);
    
    // Keep only last 10
    this.recentSearches = this.recentSearches.slice(0, 10);
    
    // Save to localStorage
    this.saveRecentSearches();
  }

  // Load recent searches from localStorage
  loadRecentSearches() {
    try {
      const stored = localStorage.getItem('vibe_library_recent_searches');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading recent searches:', error);
      return [];
    }
  }

  // Save recent searches to localStorage
  saveRecentSearches() {
    try {
      localStorage.setItem('vibe_library_recent_searches', JSON.stringify(this.recentSearches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  }

  // Get recent searches
  getRecentSearches() {
    return this.recentSearches;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

export const bookService = new BookService();

