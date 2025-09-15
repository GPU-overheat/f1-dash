import React, { useState } from 'react';
import RaceResults from './RaceResults';

const MIN_YEAR = 2018;
const CURRENT_YEAR = new Date().getFullYear();


type SearchParams = {
  year: number;
  round: string | number ;
  rType: string;
};

const RaceSearch = () => {
  const [year, setYear] = useState<number>(2025);
  const [round, setRound] = useState<string | number>('');
  const [rType] = useState<string>('R');
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchParams({ year, round, rType });
  };

  const handleYearValidation = () => {
  // Clamp the year to be within the allowed range
  const clampedYear = Math.max(MIN_YEAR, Math.min(year, CURRENT_YEAR));
  setYear(clampedYear);
};

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 text-gray-200 min-h-screen">
      <h1 className="mb-8 text-4xl font-bold tracking-wider text-white">
        Search Race Data
      </h1>
      <form onSubmit={handleSearch} className="mb-10 flex flex-col sm:flex-row gap-4 items-center p-6 bg-gray-800 rounded-lg shadow-lg">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            onBlur={handleYearValidation}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <div>
          <label htmlFor="round" className="block text-sm font-medium text-gray-300">Round (e.g., 5 or 'Monza')</label>
          <input
            id="round"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2 focus:ring-red-500 focus:border-red-500"
            placeholder="e.g., 5 or 'Monza'"
            required
          />
        </div>
        <div className="self-end">
          <button type="submit" className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors">
            Search
          </button>
        </div>
      </form>
      {searchParams && (
        <RaceResults 
          key={`${searchParams.year}-${searchParams.round}-${searchParams.rType}`}
          year={searchParams.year} 
          round={searchParams.round} 
          rType={searchParams.rType} 
        />
      )}
    </div>
  );
};

export default RaceSearch;