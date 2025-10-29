import React, { useState } from "react";
import Button from "./Button";

/**
 * API Data Component
 * Fetches jokes from the JokeAPI and allows searching by keyword
 */
const ApiData = () => {
  const [jokes, setJokes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch jokes from API
  const fetchJokes = async (term = "") => {
    setLoading(true);
    setError("");
    setJokes([]);

    try {
      let url = "https://v2.jokeapi.dev/joke/Any?amount=5";

      // Add search term to query
      if (term.trim()) {
        url = `https://v2.jokeapi.dev/joke/Any?contains=${term}&amount=5`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError("Failed to fetch jokes. Please try again later.");
      } else {
        // Format jokes array
        const formattedJokes = (data.jokes || [data]).map((j) =>
          j.type === "single"
            ? j.joke
            : `${j.setup} — ${j.delivery}`
        );
        setJokes(formattedJokes);
      }
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchJokes(searchTerm);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🎭 Joke Finder API</h2>

      {/* 🔍 Search Section */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search jokes (e.g. 'dog', 'school', 'computer')"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>

      {/* 🔁 Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading jokes...
        </p>
      )}

      {/* ❌ Error Message */}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {/* ✅ Jokes List */}
      {!loading && !error && jokes.length > 0 && (
        <ul className="space-y-4">
          {jokes.map((joke, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {joke}
            </li>
          ))}
        </ul>
      )}

      {/* 📭 No results */}
      {!loading && jokes.length === 0 && !error && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No jokes yet — try searching for something!
        </p>
      )}

      {/* 🔄 Refresh Random Jokes */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => fetchJokes()}
          variant="secondary"
          size="md"
        >
          Get Random Jokes
        </Button>
      </div>
    </div>
  );
};

export default ApiData;
