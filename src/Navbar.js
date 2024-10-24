import { useState } from 'react';
import { ReactComponent as Logo } from './assets/FinalLogo.svg'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-white text-lg font-bold">
          <span className="hidden sm:flex">Powered by</span>
          <Logo className="ml-2 mt-5" />
        </div>

        {/* Hamburger Menu (Visible below 640px) */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle the mobile menu
          className="block sm:hidden text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" style={{ color: "#9a9ca2" }} />
        </button>

        {/* Desktop Menu (Visible at 640px and above) */}
        <ul className="hidden sm:flex space-x-4 mr-2.5 sm:mr-0">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Home</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">About</a>
          </li>
        </ul>

        {/* Mobile Menu (Visible below 640px when open) */}
        {isOpen && (
          <ul className="absolute top-16 left-0 w-full bg-gray-800 sm:hidden">
            <li className="p-2 border-b border-gray-700">
              <a href="#" className="block text-gray-300 hover:text-white">Home</a>
            </li>
            <li className="p-2 border-b border-gray-700">
              <a href="#" className="block text-gray-300 hover:text-white">About</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
