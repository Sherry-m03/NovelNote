import React, { useEffect, useRef, useState } from "react";
import BookBlock from "./BookBlock";
import { useNavigate } from "react-router-dom";
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function Dashboard() {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [yourBooks, setYourBooks] = useState(false);
  const [data, setData] = useState([]);
  const [top, setTop] = useState([]);
  const [newest, setNewest] = useState([]);
  const [topAut, setTopAut] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [romance, setRomance] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [userBooks, setUserBooks] = useState([
    {
      bookId: "MZMJEQAAQBAJ",
      volumeInfo: {
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=MZMJEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        title: "Do Epic Shit",
        authors: ["Ankur Warikoo"],
        categories: ["Body"],
      },
    },
    {
      bookId: "ZWRHEAAAQBAJ",
      volumeInfo: {
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=ZWRHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        title: "The Billionaire and the Monk",
        authors: ["Vibhor Kumar Singh"],
        categories: ["Self-Help"],
      },
    },
    {
      bookId: "FjjCDgAAQBAJ",
      volumeInfo: {
        imageLinks: {
          thumbnail:
            "http://books.google.com/books/content?id=FjjCDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        title: "The Girl Who Knew Too Much",
        authors: ["Vikrant Khanna"],
        categories: ["Fiction"],
      },
    },
  ]);
  const predefinedBookIds = ["MZMJEQAAQBAJ", "ZWRHEAAAQBAJ", "FjjCDgAAQBAJ"];
  const [addedBookIds, setAddedBookIds] = useState(new Set(predefinedBookIds));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchData = async (query, orderBy, maxResults) => {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=${orderBy}&maxResults=${maxResults}&startIndex=0&key=${API_KEY}`
          );
          const data = await response.json();
          return data.items || [];
        };

        const [
          topBooks,
          newestBooks,
          bestsellers,
          authors,
          fictionBooks,
          fantasyBooks,
          romanceBooks,
          thrillerBooks,
        ] = await Promise.all([
          fetchData("fiction+economics", "relevance", 35),
          fetchData("fiction+fantasy", "newest", 20),
          fetchData("best+seller", "relevance", 20),
          fetchData("top+authors", "relevance", 20),
          fetchData("fiction", "relevance", 20),
          fetchData("fantasy", "relevance", 20),
          fetchData("romance", "relevance", 20),
          fetchData("thriller", "relevance", 20),
        ]);

        setTop(topBooks);
        setNewest(newestBooks);
        setBestseller(bestsellers);
        setTopAut(authors);
        setFiction(fictionBooks);
        setFantasy(fantasyBooks);
        setRomance(romanceBooks);
        setThriller(thrillerBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    async function getData() {
      const q = query.toLowerCase().replace(" ", "+");
      const resBooks = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=40&startIndex=0&key=${API_KEY}`
      );
      const dataBooks = await resBooks.json();
      setData(dataBooks.items);
    }
    getData();
  }, [query]);

  const handleSectionInView = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const scrollTop = Math.round(window.scrollY);
        if (scrollTop < 170) setActiveTab("data-search");
        else setActiveTab(entry.target.id);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleSectionInView, {
      threshold: [1, 0.5, 0.5, 0.5, 0.5],
      rootMargin: "0px 0px 0px 0px",
    });
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }

  function handlechange(e) {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setIsSearching(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsSearching(true);
    }
  };

  function getBookBlock(value) {
    setQuery(value);
    scrollToSection("data-search");
  }

  function addBooks(id, cover, title, author, genre) {
    const newBook = {
      bookId: id,
      volumeInfo: {
        imageLinks: {
          thumbnail: cover,
        },
        title: title,
        authors: [author],
        categories: [genre],
      },
    };
    if (!addedBookIds.has(newBook.bookId)) {
      setUserBooks((prevBooks) => [...prevBooks, newBook]);
      setAddedBookIds((prevSet) => new Set(prevSet).add(newBook.bookId));
    }
  }

  const deleteBook = (id) => {
    setUserBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== id));
    setAddedBookIds((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.delete(id);
      return updatedSet;
    });
  };

  function navgigateHome() {
    navigate("/");
  }

  const handleToggle = () => {
    const moreDiv = document.querySelector(".more-div");
    if (moreDiv.classList.contains("show-more-div")) {
      moreDiv.classList.remove("show-more-div");
    } else {
      moreDiv.classList.add("show-more-div");
    }
  };

  const handleGenreMore = (genre) => {
    setQuery(genre);
    scrollToSection("data-search");
  };

  return (
    <div className="dashboard">
      <div className="dash-disp">
        <div className="dash-nav">
          <div onClick={navgigateHome} className="dash-head">
            NovelNote
          </div>
          <div className="discover">
            <h3 id="discover-head">Discover</h3>
            <button
              className={activeTab === "data-search" ? "activeTab" : ""}
              onClick={() => {
                setYourBooks(false);
                setActiveTab("data-search");
                setTimeout(() => {
                  scrollToSection("data-search");
                }, 0);
              }}
            >
              <span className="icon">🔍</span>
              Search
            </button>
            <button
              className={activeTab === "disp-block" ? "activeTab" : ""}
              onClick={() => {
                setYourBooks(false);
                setActiveTab("disp-block");
                setTimeout(() => {
                  scrollToSection("disp-block");
                }, 0);
              }}
            >
              <span className="icon">❤️</span>
              For You
            </button>
            <button
              className={activeTab === "your-books" ? "activeTab" : ""}
              onClick={() => {
                setActiveTab("your-books");
                setYourBooks(true);
              }}
            >
              <span className="icon">📘</span>
              Your Books
            </button>
          </div>
          <div className="library">
            <h3 id="library-head">Library</h3>
            <button
              onClick={() => {
                setYourBooks(false);
                setActiveTab("fiction");
                setTimeout(() => {
                  scrollToSection("fiction");
                }, 0);
              }}
              className={activeTab === "fiction" ? "activeTab" : ""}
            >
              <span className="icon">🧛‍♀️</span>
              Fiction
            </button>
            <button
              onClick={() => {
                setYourBooks(false);
                setActiveTab("fantasy");
                setTimeout(() => {
                  scrollToSection("fantasy");
                }, 0);
              }}
              className={activeTab === "fantasy" ? "activeTab" : ""}
            >
              <span className="icon">🔮</span>
              Fantasy
            </button>
            <button
              onClick={() => {
                setYourBooks(false);
                setActiveTab("romance");
                setTimeout(() => {
                  scrollToSection("romance");
                }, 0);
              }}
              className={activeTab === "romance" ? "activeTab" : ""}
            >
              <span className="icon">💕</span>
              Romance
            </button>
            <button
              onClick={() => {
                setYourBooks(false);
                setActiveTab("thriller");
                setTimeout(() => {
                  scrollToSection("thriller");
                }, 0);
              }}
              className={activeTab === "thriller" ? "activeTab" : ""}
            >
              <span className="icon">⭐</span>
              Thriller
            </button>
            <button
              className={activeTab === "more" ? "activeTab" : ""}
              onClick={() => {
                setYourBooks(false);
                setActiveTab("more");
                handleToggle();
              }}
            >
              <span className="icon">📚</span>
              More
            </button>
          </div>
        </div>
        {!yourBooks ? (
          <div>
            <input
              placeholder="Search books by name, author, genre and etc ..."
              id="data-search"
              value={query}
              autoComplete="off"
              autoCorrect="off"
              onChange={handlechange}
              onKeyDown={handleKeyDown}
              className="dash-search"
            ></input>
            {isSearching && (
              <div>
                <BookBlock
                  data={data}
                  addBooks={addBooks}
                  sendData={getBookBlock}
                  addedSet={addedBookIds}
                />
              </div>
            )}
            <div
              id="disp-block"
              ref={(el) => (sectionsRef.current[0] = el)}
              className="dash-block"
            >
              <div
                className="disp-block disp-block1"
                onClick={() => scrollToSection("top-30")}
              >
                Daily Top 30
              </div>
              <div
                className="disp-block disp-block2"
                onClick={() => scrollToSection("new-releases")}
              >
                New Releases
              </div>
              <div
                className="disp-block disp-block3"
                onClick={() => scrollToSection("bestsellers")}
              >
                Bestsellers
              </div>
              <div
                className="disp-block disp-block4"
                onClick={() => scrollToSection("top-authors")}
              >
                Top Authors
              </div>
            </div>
            <div id="top-30">
              <h3 className="top-30">Daily Top 30</h3>
              <BookBlock
                data={top}
                addBooks={addBooks}
                addedSet={addedBookIds}
                sendData={getBookBlock}
              />
            </div>
            <div id="new-releases">
              <h3 className="top-30">Newest Releases</h3>
              <BookBlock
                data={newest}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div id="bestsellers">
              <h3 className="top-30">Bestsellers</h3>
              <BookBlock
                data={bestseller}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div id="top-authors">
              <h3 className="top-30">Top Authors</h3>
              <BookBlock
                data={topAut}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div ref={(el) => (sectionsRef.current[1] = el)} id="fiction">
              <h3 className="top-30">Fiction</h3>
              <BookBlock
                data={fiction}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div ref={(el) => (sectionsRef.current[2] = el)} id="fantasy">
              <h3 className="top-30">Fantasy</h3>
              <BookBlock
                data={fantasy}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div ref={(el) => (sectionsRef.current[3] = el)} id="romance">
              <h3 className="top-30">Romance</h3>
              <BookBlock
                data={romance}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
            <div ref={(el) => (sectionsRef.current[4] = el)} id="thriller">
              <h3 className="top-30">Thriller</h3>
              <BookBlock
                data={thriller}
                addedSet={addedBookIds}
                addBooks={addBooks}
                sendData={getBookBlock}
              />
            </div>
          </div>
        ) : (
          <div className="your-books">
            <BookBlock
              data={userBooks}
              addedSet={addedBookIds}
              deleteBook={deleteBook}
              sendData={getBookBlock}
              yourBooks={true}
            />
          </div>
        )}

        <div onClick={handleToggle} className="more-div">
          <button className="close-button">✖</button>
          <div className="more-div-content">
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Anthologies")}
            >
              Anthologies
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Art")}
            >
              Art
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Audiobooks")}
            >
              Audiobooks
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Biographies")}
            >
              Biographies
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Body")}
            >
              Body
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Business")}
            >
              Business
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Children")}
            >
              Children
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Comics")}
            >
              Comics
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Contemporary")}
            >
              Contemporary
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Cooking")}
            >
              Cooking
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Crime")}
            >
              Crime
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Engineering")}
            >
              Engineering
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Entertainment")}
            >
              Entertainment
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Fantasy")}
            >
              Fantasy
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Fiction")}
            >
              Fiction
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Food")}
            >
              Food
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("General")}
            >
              General
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Health")}
            >
              Health
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("History")}
            >
              History
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Horror")}
            >
              Horror
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Investing")}
            >
              Investing
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Literary")}
            >
              Literary
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Literature")}
            >
              Literature
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Manga")}
            >
              Manga
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Media-help")}
            >
              Media-help
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Memoirs")}
            >
              Memoirs
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Mind")}
            >
              Mind
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Mystery")}
            >
              Mystery
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Nonfiction")}
            >
              Nonfiction
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Religion")}
            >
              Religion
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Romance")}
            >
              Romance
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Science")}
            >
              Science
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Self")}
            >
              Self
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Spirituality")}
            >
              Spirituality
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Sports")}
            >
              Sports
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Superheroes")}
            >
              Superheroes
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Technology")}
            >
              Technology
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Thrillers")}
            >
              Thrillers
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Travel")}
            >
              Travel
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Women")}
            >
              Women
            </h3>
            <h3
              className="more-div-genre"
              onClick={() => handleGenreMore("Young")}
            >
              Young
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
