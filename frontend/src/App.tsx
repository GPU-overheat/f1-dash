import { useState, useEffect } from 'react';

function RaceResults() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/session/2024/Monza/R');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setResults(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceData();
  }, []);


  if (loading) {
    return <div>Loading race results...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Monza 2024 Race Results</h1>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {results && results.map((driver) => (
            <tr key={driver.DriverNumber}>
              <td>{driver.Position}</td>
              <td>{driver.FullName}</td>
              <td>{driver.TeamName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RaceResults;