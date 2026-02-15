import React from 'react';
import { MapPin, ExternalLink, Clock } from 'lucide-react';
import { getHackathonStatus } from '../utils/dateUtils';
import './HackathonCard.css';

const HackathonCard = ({ hackathon }) => {
    const {
        name,
        city,
        source,
        url,
        icon
    } = hackathon;

    const { status, color, displayDate } = getHackathonStatus(hackathon);

    const getSourceColor = (sourceName) => {
        const colors = {
            'mlh': '#e7332b',
            'devpost': '#003e54',
            'devfolio': '#3770ff',
            'unstop': '#1c1c1c', // Will change CSS to handle visibility if needed, or change this hex
            'hack2skill': '#4caf50'
        };
        // Unstop specifically requested to be changed if blending. 
        // #1c1c1c is very dark. If card bg is dark, it blends.
        // Let's use a lighter/branded blue-orange for Unstop or just a visible color.
        if (sourceName?.toLowerCase() === 'unstop') return '#0077b5'; // Example distinct color

        return colors[sourceName?.toLowerCase()] || '#646cff';
    };

    const locationDisplay = city || 'Online';

    return (
        <div className={`hackathon-card status-${color}`}>
            <div className="card-top">
                <div className="badges-container">
                    <div className="source-badge" style={{ backgroundColor: getSourceColor(source) }}>
                        {source || 'Event'}
                    </div>
                    <div className={`status-badge ${color}`}>
                        {status}
                    </div>
                </div>
                {icon && <img src={icon} alt="" className="source-icon" />}
            </div>

            <div className="card-content">
                <div className="hackathon-info">
                    <h3 className="hackathon-name" title={name}>
                        {name}
                    </h3>

                    <div className="hackathon-meta">
                        <div className="meta-item location">
                            <MapPin size={14} />
                            <span>{locationDisplay}</span>
                        </div>

                        <div className="meta-item date">
                            <Clock size={14} />
                            <span>{displayDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                <a href={url} target="_blank" rel="noopener noreferrer" className="view-button">
                    View Details
                    <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                </a>
            </div>
        </div>
    );
};

export default HackathonCard;
