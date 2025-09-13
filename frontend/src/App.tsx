import React, { useState, useEffect } from 'react';

type DriverResult = {
  DriverNumber: string;
  Position: number;
  FullName: string;
  TeamName: string;
};

const RaceResults: React.FC = () => {
  const [results, setResults] = useState<DriverResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
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
          {results && results.map((driver: DriverResult) => (
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