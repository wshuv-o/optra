"use client";

import { useState } from "react";

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6">AI Search</h1>

      {/* Search Input and Button */}
      <div className="flex gap-6 mb-6">
        <input
          type="text"
          placeholder="Ask anything (e.g., Total leads in March)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-4 w-full rounded-lg border border-gray-600 bg-white-800 text-black placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-white-700 text-black rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-400 font-semibold">{error}</p>}

      <div className=" md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white-900 rounded-lg shadow-xl hover:shadow-2xl transition"
          >
            <h3 className="font-semibold text-xl text-black-300 mb-3">
              Result {index + 1}
            </h3>
            <div className="text-white-400 text-sm leading-6 whitespace-pre-wrap">
              {result.generated_text || JSON.stringify(result, null, 2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
