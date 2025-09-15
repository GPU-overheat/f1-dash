export type DriverResult = {
  DriverNumber: string;
  Position: number;
  FullName: string;
  TeamName: string;
  TeamColor: string;
  Time: string | null;
};

export type SessionData = {
  eventName: string;
  eventDate: string;
  results: DriverResult[];
};

export type RaceResultsProps = {
  year: number;
  round: number | string;
  rType: string;
};

export type SearchParams = {
  year: number;
  round: string | number ;
  rType: string;
};