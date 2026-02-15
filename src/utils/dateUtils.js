export const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    try {
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
        return dateString;
    }
};

export const getHackathonStatus = (hackathon) => {
    const { start_date, end_date, registration_deadline } = hackathon;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates without time for simpler logic if needed, but strict comparison is fine too.

    const safeDate = (d) => (d ? new Date(d) : null);

    const regDate = safeDate(registration_deadline);
    const endDate = safeDate(end_date);
    const startDate = safeDate(start_date);

    // 1. Registration Open
    if (regDate && regDate >= today) {
        const diffTime = Math.abs(regDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) {
            return {
                status: 'Closing Soon',
                color: 'red',
                displayDate: `Reg ends: ${formatDate(registration_deadline)}`
            };
        }

        return {
            status: 'Registration Open',
            color: 'green',
            displayDate: `Reg ends: ${formatDate(registration_deadline)}`
        };
    }

    // 2. Ongoing
    // If end_date exists and is in the future (and we implied it started? User said "If end_date >= today")
    if (endDate && endDate >= today) {
        return {
            status: 'Ongoing',
            color: 'yellow',
            displayDate: `Ends: ${formatDate(end_date)}`
        };
    }

    // 3. Upcoming
    if (startDate && startDate >= today) {
        return {
            status: 'Upcoming',
            color: 'blue',
            displayDate: `Starts: ${formatDate(start_date)}`
        };
    }

    // 4. Default / Fallback
    return {
        status: 'Date TBA',
        color: 'gray',
        displayDate: 'Date TBA'
    };
};
