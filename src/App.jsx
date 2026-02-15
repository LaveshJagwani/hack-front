import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsContainer from './components/ResultsContainer';
import { searchHackathons } from './services/api';
import { Info } from 'lucide-react';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [sources, setSources] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await searchHackathons(query);
      // API returns object with results array
      const listing = Array.isArray(data) ? data : (data.results || []);
      const sourceCounts = data.sources || {};

      setResults(listing);
      setSources(sourceCounts);
    } catch (err) {
      setError('Failed to fetch hackathons. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {!loading && hasSearched && (
        <div className="accuracy-notice">
          <Info size={14} className="notice-icon" />
          <span>Some details may occasionally be inconsistent due to external website changes. Please verify information on the official hackathon page.</span>
        </div>
      )}
      <header className="app-header">
        <h1>Hackathon Finder</h1>
        <p>Find your next build.</p>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        <ResultsContainer
          results={results}
          sources={sources}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
        />
      </main>
    </div>
  );
}

export default App;
