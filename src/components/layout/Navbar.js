import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-info bg-info mb-5'>
      <Link className='navbar-brand mb-0 h1 mx-auto text-white' to={'/'}>
        LyricFinder
      </Link>
    </nav>
  );
};

export default Navbar;
