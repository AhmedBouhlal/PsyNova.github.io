// Book data
const books = [
  {
    id: 1,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    category: "productivity",
    description: "Transform your life with these powerful principles of effectiveness.",
    cover: "assets/book1.jpg",
    rating: 4.8,
    price: 24.99
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "productivity",
    description: "Tiny changes, remarkable results. Build good habits and break bad ones.",
    cover: "assets/book2.jpg",
    rating: 4.9,
    price: 19.99
  },
  {
    id: 3,
    title: "Mindset: The New Psychology of Success",
    author: "Carol Dweck",
    category: "mindset",
    description: "Discover the power of mindset in achieving your goals.",
    cover: "assets/book3.jpg",
    rating: 4.7,
    price: 22.99
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    category: "productivity",
    description: "Rules for focused success in a distracted world.",
    cover: "assets/book4.jpg",
    rating: 4.6,
    price: 21.99
  },
  {
    id: 5,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "business",
    description: "How today's entrepreneurs use continuous innovation.",
    cover: "assets/book5.jpg",
    rating: 4.5,
    price: 26.99
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "mindset",
    description: "Understand the two systems that drive how we think.",
    cover: "assets/book6.jpg",
    rating: 4.7,
    price: 23.99
  },
  {
    id: 7,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "learning",
    description: "Why we do what we do and how to change.",
    cover: "assets/book7.jpg",
    rating: 4.6,
    price: 20.99
  },
  {
    id: 8,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "business",
    description: "Notes on startups, or how to build the future.",
    cover: "assets/book8.jpg",
    rating: 4.4,
    price: 24.99
  },
  {
    id: 9,
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    category: "productivity",
    description: "Escape 9-5, live anywhere, and join the new rich.",
    cover: "assets/book9.jpg",
    rating: 4.3,
    price: 18.99
  },
  {
    id: 10,
    title: "Daring Greatly",
    author: "Brené Brown",
    category: "mindset",
    description: "How the courage to be vulnerable transforms the way we live, love, parent, and lead.",
    cover: "assets/book10.jpg",
    rating: 4.6,
    price: 21.99
  },
  {
    id: 11,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "business",
    description: "How today's entrepreneurs use continuous innovation.",
    cover: "assets/book11.jpg",
    rating: 4.5,
    price: 26.99
  },
  {
    id: 12,
    title: "Ultralearning",
    author: "Scott Young",
    category: "learning",
    description: "Master hard skills, outsmart the competition, and accelerate your career.",
    cover: "assets/book12.jpg",
    rating: 4.4,
    price: 19.99
  }
];

let currentFilter = 'all';
let filteredBooks = [...books];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderBooks(books);
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      applyFilters();
    });
  });
}

function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (searchTerm === '') {
    filteredBooks = currentFilter === 'all' ? [...books] : books.filter(book => book.category === currentFilter);
  } else {
    filteredBooks = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                          book.author.toLowerCase().includes(searchTerm) ||
                          book.description.toLowerCase().includes(searchTerm);
      const matchesFilter = currentFilter === 'all' || book.category === currentFilter;
      return matchesSearch && matchesFilter;
    });
  }
  
  renderBooks(filteredBooks);
}

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (currentFilter === 'all') {
    filteredBooks = searchTerm ? 
      books.filter(book => book.title.toLowerCase().includes(searchTerm) || 
                          book.author.toLowerCase().includes(searchTerm) ||
                          book.description.toLowerCase().includes(searchTerm)) : 
      [...books];
  } else {
    filteredBooks = books.filter(book => {
      const matchesFilter = book.category === currentFilter;
      const matchesSearch = searchTerm ? 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) : true;
      return matchesFilter && matchesSearch;
    });
  }
  
  renderBooks(filteredBooks);
}

function renderBooks(booksToRender) {
  const booksGrid = document.getElementById('booksGrid');
  
  if (booksToRender.length === 0) {
    booksGrid.innerHTML = '<div class="no-results">No books found. Try different search terms or filters.</div>';
    return;
  }
  
  booksGrid.innerHTML = booksToRender.map(book => `
    <div class="book-card" data-id="${book.id}">
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <p class="book-description">${book.description}</p>
        <div class="book-meta">
          <span class="book-category">${book.category}</span>
          <div class="book-rating">
            ${generateStars(book.rating)}
            <span class="rating-value">${book.rating}</span>
          </div>
        </div>
        <div class="book-actions">
          <span class="book-price">$${book.price}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  if (hasHalfStar) {
    stars += '☆';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '☆';
  }
  
  return `<span class="stars">${stars}</span>`;
}

function addToProtocol(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    // Store selected book for protocol
    localStorage.setItem('selectedBook', JSON.stringify(book));
    window.location.href = 'problem.html';
  }
}
