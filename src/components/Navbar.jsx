import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import { toggleTheme } from '../store/action/ActionTheme';  // Pastikan nama fungsi toggle benar
import { Link } from 'react-router-dom';

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Untuk navigasi ke halaman pencarian

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Fungsi untuk navigasi ke halaman pencarian
  const handleSearchClick = () => {
    navigate("/search"); // Sesuaikan rute sesuai dengan rute pencarian Anda
  };

  return (
    <div>
      <div className="navbar bg-white dark:bg-slate-900 fixed top-0 left-0 w-full z-50">
        <div className="flex-1 relative group">
          {/* Tombol Home yang memicu dropdown */}
          <Link to="/" className="btn btn-ghost bg-white dark:bg-slate-700 text-black dark:text-white">
            Home
          </Link>
        </div>
        <div className="flex-none gap-2">
          <button
            className="button justify-center"
            onClick={handleSearchClick}
            aria-label="Search"
          >
             <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} // Change colors based on the theme
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.35-4.35"
              />
            </svg>
          </button>
          <label className="grid cursor-pointer place-items-center">
            <input
              type="checkbox"
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              onClick={() => dispatch(toggleTheme())}
            />
          </label>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/Profil" className="block px-4 py-2">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Favorite" className="block px-4 py-2">
                Favorite
              </Link>
            </li>
            <li>
              <Link to="/MyRatting" className="block px-4 py-2">
                My Rating
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
