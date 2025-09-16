import React, { useState, useEffect } from "react";
import type { DriverResult, SessionData, RaceResultsProps } from "../types";

const styles = {
  wholediv:
    "flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-900 p-4 text-gray-200",
  titlediv: "mb-8 text-4xl font-bold tracking-wider text-white",
  secdiv: "w-full max-w-5xl overflow-hidden rounded-lg shadow-lg",
  headerstyle: "p-3 text-left text-sm font-semibold uppercase tracking-wider",
};

const formatTime = (timeString: string | null, position: number): string => {
  if (typeof timeString !== "string") {
    return "-";
  }

  const match = timeString.match(/(\d{2}):(\d{2}):(\d{2})\.(\d+)/);
  if (!match) return "-";

  const [, hours, minutes, seconds] = match;

  if (position === 1) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    if (hours === "00" && minutes === "00") {
      return `+${seconds}.${match[4].substring(0, 3)}s`;
    }
    return `+${minutes}:${seconds}.${match[4].substring(0, 3)}`;
  }
};

const RaceResults: React.FC<RaceResultsProps> = ({ year, round, rType }) => {
  const [results, setResults] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaceData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/session/${year}/${round}/${rType}`
        );
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
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
  }, [year, round, rType]);

  if (loading) {
    return <div className="">Loading race results...</div>;
  }

  if (error) {
    return <div className="">Error: {error}</div>;
  }
  if (results && results.results.length === 0) {
    return (
      <div>
        <h1 className={styles.titlediv}>{results.eventName}</h1>
        <div className="text-center">
          <p className="text-2xl text-gray-300">Race didn't happen yet.</p>
          <p className="mt-2 text-lg text-gray-500">
            This event is scheduled for {results.eventDate}.
          </p>
        </div>
      </div>
    );
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
              <th className={styles.headerstyle}>Pos</th>
              <th className={styles.headerstyle}>Driver</th>
              <th className={styles.headerstyle}>Team</th>
              <th className={styles.headerstyle}>Time</th>
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
                  <td className="p-3 font-mono">
                    {formatTime(driver.Time, driver.Position)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceResults;

// you might need this pieace later
// const response = await fetch(`/api/session/${year}/${round}/${rType}`);
