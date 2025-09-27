import React, { useState } from 'react';

const TestRideBookingPage = () => {
    const [vehicle, setVehicle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the booking logic, e.g., sending data to an API
        setMessage(`Test ride booked for ${vehicle} on ${date} at ${time}`);
    };

    return (
        <div>
            <h1>Book a Test Ride</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Select Vehicle:
                        <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} required>
                            <option value="">--Select a Vehicle--</option>
                            <option value="EV">Electric Vehicle</option>
                            <option value="Petrol">Petrol Vehicle</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Time:
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Book Test Ride</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TestRideBookingPage;