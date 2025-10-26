import React, { useState } from "react";

//  API Data Component
export default function ApiData() {
  // State variables to store jokes, loading status, error messages, and the search term
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  //  Function to fetch jokes (either random or based on search)
  const fetchJokes = async (query = "") => {
    setLoading(true); // Show loading spinner/text
    setError(""); // Clear old errors
    setJokes([]); // Clear previous jokes

    try {
      // If user searched for something, build a category-based API URL
      const url = query
        ? `https://api.api-ninjas.com/v1/jokes?limit=3&category=${encodeURIComponent(query)}`
        : "https://api.api-ninjas.com/v1/jokes?limit=3"; // Default = 3 random jokes

      // Make API request using the hidden key from your .env file
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY, // 👈 your secret API key
        },
      });

      // If request failed, show error
      if (!response.ok) throw new Error("Failed to fetch jokes");

      // Convert JSON response into JavaScript object
      const data = await response.json();

      // If no jokes are returned, display a friendly message
      if (data.length === 0) {
        setError("No jokes found for that topic.");
      } else {
        setJokes(data); // Store jokes in state
      }
    } catch (err) {
      // Handle unexpected errors
      setError(err.message || "Something went wrong fetching jokes.");
    } finally {
      // Hide loading indicator after everything is done
      setLoading(false);
    }
  };

  // 🔍 When user submits the search form
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    fetchJokes(search.trim()); // Fetch jokes based on what they typed
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
        😂 Joke Finder
      </h2>

      {/* 🔎 Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state with input value
          placeholder="Search for a joke topic (e.g. dog, teacher)"
          className="flex-1 p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"} {/* Button text changes when loading */}
        </button>
      </form>

      {/* 🕒 Show loading, error, or jokes */}
      {loading && <p className="text-gray-500 dark:text-gray-400 text-center">Loading jokes...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* 📜 Display jokes if any */}
      {!loading && jokes.length > 0 && (
        <ul className="space-y-4">
          {jokes.map((jokeObj, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
            >
              {jokeObj.joke}
            </li>
          ))}
        </ul>
      )}

      {/* 🔁 Random jokes button */}
      <div className="text-center mt-6">
        <button
          onClick={() => fetchJokes()} // Fetch random jokes when clicked
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Random Jokes"} 
        </button>
      </div>
    </div>
  );
} 
