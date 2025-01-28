import React, { useState, useEffect } from "react";

export default function BookBlock({
  data,
  sendData,
  addBooks,
  deleteBook,
  addedSet,
  yourBooks = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = yourBooks ? 9 : 6;
  const filteredData = data?.filter(
    (book) =>
      book?.volumeInfo?.title &&
      book?.volumeInfo?.imageLinks?.thumbnail &&
      book?.volumeInfo?.authors?.[0]
  );
  const visibleItems = filteredData?.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );

  const setGenre = (genre) => {
    sendData(genre);
  };

  const handleNext = () => {
    if (currentIndex + ITEMS_PER_PAGE < filteredData?.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  };

  const addListBooks = (id, cover, title, author, genre) => {
    addBooks(id, cover, title, author, genre);
  };

  const deleteListBooks = (id) => {
    deleteBook(id);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [yourBooks]);

  return (
    <div className={yourBooks ? "book-block-your-books" : "book-block"}>
      <div className="disp-nav-buttons">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <img src="angle-circle-left-icon.png" alt="back" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + ITEMS_PER_PAGE >= filteredData?.length}
        >
          <img src="angle-circle-right-icon.png" alt="next" />
        </button>
      </div>
      <div
        className={yourBooks ? "book-disp-block-your-books" : "book-disp-block"}
      >
        {visibleItems?.map((book, index) => (
          <div
            key={index}
            className={yourBooks ? "book-item-your-books" : "book-item"}
            id={`book${(index + 1) % 6}`}
          >
            <img
              src={book?.volumeInfo?.imageLinks?.thumbnail || "wave1.png"}
              alt={book?.volumeInfo?.title || "No title available"}
            />
            <div className="book-info">
              <h3
                style={{ marginBottom: "0", marginTop: "0" }}
                id="book-info-title"
              >
                {book?.volumeInfo?.title.slice(0, 50)}
                {book?.volumeInfo?.title.length > 50 ? "..." : ""}
              </h3>
              <p>{book?.volumeInfo?.authors?.[0] || "Unknown Author"}</p>
              <div
                onClick={() => setGenre(book?.volumeInfo?.categories?.[0])}
                id={`genre${(index + 1) % 6}`}
                className="genre-info"
              >
                {book?.volumeInfo?.categories?.[0] || "Other"}
              </div>
            </div>
            {yourBooks ? (
              <img
                id="add-book"
                src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/close-square-icon.svg"
                alt="delete book"
                onClick={() => deleteListBooks(book.bookId)}
              />
            ) : addedSet.has(book.id) ? (
              <img
                id="disabled-book"
                src="plus-disabled.png"
                alt="disabled add button"
              />
            ) : (
              <img
                id="add-book"
                src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/plus-square-icon.png"
                alt="add book"
                onClick={() =>
                  addListBooks(
                    book.id,
                    book?.volumeInfo?.imageLinks?.thumbnail,
                    book?.volumeInfo?.title,
                    book?.volumeInfo?.authors?.[0],
                    book?.volumeInfo?.categories?.[0]
                  )
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
