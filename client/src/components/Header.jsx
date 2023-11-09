/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.svg'


function Header({ isLoggedIn }) {
  //TODO: Fix buttons that show (they differ between pages?)
  const navigateTo = useNavigate()
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="header">
        <nav className={`bg-white w-full flex items-center justify-between flex-wrap p-6 shadow-lg '${isSticky && 'fixed top-0'}'`}>
          <div className="flex items-center text-black mr-6">
            <img src={logo} alt="logo" />
            <Link to="/"><span className="font-semibold text-xl tracking-tight text-slate-800"> <br></br>Thesis Proposals </span></Link>

          </div>

          <div>
            <button
              className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-full mr-3 font-semibold"
              onClick={() => { navigateTo('/add') }}
            >
              New Proposal
            </button>
            <button
              className="bg-white text-gray-700 hover:text-gray-900 py-2 px-4 rounded-full mr-3 border-solid border border-gray-600 font-semibold"
              onClick={() => { navigateTo('/login') }}
            >
              Sign In
            </button>

          </div>

        </nav>
      </header>
      
    </>

  )
}

export default Header