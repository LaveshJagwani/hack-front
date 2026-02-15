import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form className="search-bar-container" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="e.g., Hackathons in Mumbai"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" className="search-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
