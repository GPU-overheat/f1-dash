import React, { useState, useEffect } from "react";

const styles = {
	"wholediv": "flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-gray-200",
	"titlediv": "mb-8 text-4xl font-bold tracking-wider text-white",
	"secdiv": "w-full max-w-4xl overflow-hidden rounded-lg shadow-lg",
	"headerstyle": "p-3 text-left text-sm font-semibold uppercase tracking-wider"


}

type RaceResultsProps = {
  year: number;
  round: number | string;
  rType: string;
};

type DriverResult = {
  DriverNumber: string;
  Position: number;
  FullName: string;
  TeamName: string;
  TeamColor: string;
};

type SessionData = {
  eventName: string;
  eventDate: string;
  results: DriverResult[];
};

const RaceResults: React.FC<RaceResultsProps> = ({year, round, rType}) => {
  const [results, setResults] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const response = await fetch(`/api/session/${year}/${round}/${rType}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRaceData();
  },);

  if (loading) {
    return <div className={styles.wholediv}>Loading race results...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.wholediv}>
      <h1 className={styles.titlediv}>
        {results?.eventName} {results?.eventDate}
      </h1>
      <div className={styles.secdiv}>
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className={styles.headerstyle}>
                Pos
              </th>
              <th className={styles.headerstyle}>
                Driver
              </th>
              <th className={styles.headerstyle}>
                Team
              </th>
            </tr>
          </thead>
          <tbody>
            {results &&
              results.results.map((driver: DriverResult) => (
                <tr
                  key={driver.DriverNumber}
                  className="border-b border-gray-700 bg-gray-800/50 transition-colors hover:bg-gray-700/50"
                  style={{ borderLeft: `4px solid #${driver.TeamColor}` }}
                >
                  <td className="p-3 font-mono text-center">
                    {driver.Position}
                  </td>
                  <td className="p-3 font-bold">{driver.FullName}</td>
                  <td className="p-3 text-gray-400">{driver.TeamName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceResults;
