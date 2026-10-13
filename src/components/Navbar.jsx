import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          SORA
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
          <li><a href="#cases" onClick={(e) => handleNavClick(e, '#cases')}>Cases</a></li>
          <li><a href="#other" onClick={(e) => handleNavClick(e, '#other')}>Other</a></li>
          <li><a href="#writing" onClick={(e) => handleNavClick(e, '#writing')}>Writing</a></li>
          <li><a href="#resume" onClick={(e) => handleNavClick(e, '#resume')}>Resume</a></li>
          <li className="lang-buttons">
            <button className={`lang-btn ${language === 'kr' ? 'active' : ''}`} onClick={() => setLang('kr')}>KR</button>
            <span className="lang-divider">/</span>
            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <span className="lang-divider">/</span>
            <button className={`lang-btn ${language === 'jp' ? 'active' : ''}`} onClick={() => setLang('jp')}>JP</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
