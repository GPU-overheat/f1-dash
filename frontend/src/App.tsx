import { Link } from "react-router-dom";

const linkstyle =
  "inline-block transform -skew-x-12 bg-gradient-to-r from-red-600 to-red-800 rounded-sm shadow-lg shadow-red-500/30 border-b-4 border-red-900 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/50 active:scale-100";
const spanStyle =
  "inline-block transform skew-x-12 text-white font-bold uppercase tracking-widest text-lg py-3 px-10";

const App = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <div className="text-center py-20 px-4 bg-gray-900">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          F1<span className="text-red-500">-</span>DASH
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Add this piece of code does until now is fetch you results, from 2018
          season to the very last race in the current season.
        </p>
        <Link to="/search" className={linkstyle}>
          <span className={spanStyle}>Search For A Race</span>
        </Link>
      </div>
    </div>
  );
};

export default App;