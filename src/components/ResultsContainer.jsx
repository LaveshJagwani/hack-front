import React, { useState, useEffect } from 'react';
import HackathonCard from './HackathonCard';
import { Loader2, Info } from 'lucide-react';
import './ResultsContainer.css';

const ResultsContainer = ({ results, sources, loading, error, hasSearched }) => {
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        setVisibleCount(6);
    }, [results]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const getSourceColor = (sourceName) => {
        const colors = {
            'mlh': '#e7332b',
            'devpost': '#003e54',
            'devfolio': '#3770ff',
            'unstop': '#0077b5',
            'hack2skill': '#4caf50'
        };
        return colors[sourceName?.toLowerCase()] || '#646cff';
    };

    if (loading) {
        return (
            <div className="results-status">
                <Loader2 className="spinner" size={48} />
                <p>Searching for hackathons...</p>
            </div>
        );
    }

    if (error) {
        return <div className="results-status error">{error}</div>;
    }

    // Only handle truly empty state here (if we have no results AND no fallback display needed)
    // But we might want to show sources even if no results? Usually not.
    if (hasSearched && results.length === 0) {
        return (
            <div className="results-status">
                <p>No hackathons found matching your criteria.</p>
            </div>
        );
    }

    const visibleResults = results.slice(0, visibleCount);
    const hasMore = visibleCount < results.length;

    // Hardcoded sources as requested
    const displaySources = ['mlh', 'devpost', 'unstop', 'devfolio', 'hackerearth'];

    return (
        <div className="results-container-wrapper">
            {hasSearched && (
                <>
                    {displaySources.length > 0 && (
                        <div className="sources-display">
                            <span className="sources-label">Aggregated from:</span>
                            <div className="sources-list">
                                {displaySources.map(source => (
                                    <div
                                        key={source}
                                        className="source-chip"
                                        style={{ '--source-color': getSourceColor(source) }}
                                    >
                                        {source}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="results-grid">
                {visibleResults.map((hackathon, index) => (
                    <HackathonCard key={index} hackathon={hackathon} />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                        View More ({results.length - visibleCount} remaining)
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultsContainer;
