# NovelNote 📚

NovelNote is a modern web application designed for book enthusiasts to discover, browse, and manage their favorite books. The app integrates with the Google Books API to provide dynamic and interactive book search functionality.

## Features 🚀

- **Search Functionality**: Search books by title, author, or genre.
- **Personal Library**: Add or remove books from your personal collection.
- **Dynamic Navigation**: Navigate curated categories like "Fiction," "Fantasy," and "Thrillers."
- **Interactive Modals**: Toggle the "More" menu to explore additional genres.
- **Smooth Transitions**: Intuitive animations and transitions for a better user experience.
- **Real-Time Data**: Fetches data using the Google Books API.

## Tech Stack 🛠️

- **Frontend**: React.js
- **Styling**: CSS
- **Backend API**: Google Books API

## Installation

### Steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sherry-m03/NovelNote.git
   cd NovelNote
   ```

2. **Install Dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `client` directory with the following:

   ```env
   REACT_APP_GOOGLE_API_KEY=your_api_key_here
   ```

4. **Start the Application**

   ```bash
   cd ../client
   npm start
   ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
client/
├── src/
│    ├── components/    # React components
│    ├── App.js         # Main React app
│    ├── index.js       # Entry point
│    └── index.css      # CSS/SCSS file
├── public/             # Static assets
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # Documentation
```

# Usage 🖥️

## Search Books

- Enter a book title, author, or genre in the search bar and press **Enter** to search.
- Results appear dynamically as cards displaying:
  - **Book Title**
  - **Author**
  - **Genre**

---

## Manage Your Library

- **Add Books**: Click the **"+" icon** on any book card to add it to your library.
- **View Library**: Navigate to the **"Your Books"** section to view and manage your personal collection.
- **Remove Books**: Click the **"✖ icon"** on any book in your library to remove it.

---

## Navigate Categories

- Use the **navigation bar** to explore predefined genres:
  - **Fiction**
  - **Fantasy**
  - **Romance**
  - **Thriller**
  - ...and more.
- **More Genres**: Click on the **"More"** button to toggle additional genre options dynamically.

```

## Acknowledgments

- Google Books API for providing book data
- Icons and assets by UXWing.

```
