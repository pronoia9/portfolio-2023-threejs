import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const getLinks = (ulStyle, liStyle, liOnClick) => (
    <ul className={ulStyle}>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${liStyle} ${active === link.title ? 'text-white' : 'text-secondary'}`}
          onClick={() => {
            setActive(link.title);
            liOnClick && liOnClick();
          }}>
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}>
          <img className='w-9 h-9 object-contain' src={logo} alt='logo' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Jay&nbsp;<span className='sm:block hidden'>| Full-Stack Developer</span>
          </p>
        </Link>
        {/* Navbar */}
        {getLinks(
          'list-none hidden sm:flex flex-row gap-10',
          'hover:text-white text-[18px] font-medium cursor-pointer'
        )}
        {/* Mobile menu */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            src={toggle ? close : menu}
            alt='menu'
            onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            {getLinks(
              'list-none flex justify-end items-start flex-1 flex-col gap-4',
              'font-poppins font-medium cursor-pointer text-[16px]',
              () => setToggle(!toggle)
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
