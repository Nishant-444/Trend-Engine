import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import "./App.css"
import "./index.css"
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx"
import Card from "./components/Card.jsx"
import { database, getTrendingMovies, updateSearchCount } from "./appwrite.js"


const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [trendingMovies, setTrendingMovies] = useState([])

  // Fetch movies from TMDB
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // THIS IS THE MAIN CHANGE:
      // We now call our own API route.
      const endpoint = query
        ? `/api/movies?query=${encodeURIComponent(query)}`
        : `/api/movies`;

      // We don't need API_OPTIONS here anymore because the server handles the secret key.
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovieList(data.results || []);

      // This part for Appwrite can remain the same
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("❌ Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending movies from Appwrite
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    } catch (error) {
      console.error("❌ Error fetching trending movies:", error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        {/* Header Section */}
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Trending Movies */}
        {trendingMovies?.length > 0 && !searchTerm && (
          <section className="trending mt-[40px] ">
            <h2 className="mb-10">🔥 Trending Movies</h2>
            <ul> {/* The styling is now handled by index.css */}
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p className="trending-number stroked-text">{index + 1}</p>

                  <div className="trending-content">
                    <img
                      src={
                        movie.poster_url ||
                        "https://via.placeholder.com/200x300?text=No+Poster"
                      }
                      alt={movie.searchTerm || "Movie poster"}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Search / All Movies */}
        <section className="all-movies mt-[40px]">
          <h2>{searchTerm ? "🔎 Search Results" : "📃 All Movies"}</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid gap-4">
              {movieList.length === 0 && searchTerm && (
                <p>No movies found for "{searchTerm}". Try another search!</p>
              )}

              {movieList.map((movie) => (
                <li key={movie.id}>
                  <Card movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
