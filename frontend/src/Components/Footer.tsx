
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-2 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} F1-DASH. All Rights Reserved.
        </p>
        <p className="mt-1 text-xs">
          Data provided by{' '}
          <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
            FastF1
          </a>
          . This project is not affiliated with Formula 1. By{' '}
		  <a href="https://github.com/GPU-overheat" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">GPU-overheat</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;