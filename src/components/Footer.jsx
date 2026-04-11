import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://github.com/Gosorasora" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="mailto:kodh0204@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
      </div>
      <p className="copyright">
        Designed & Built by Ko Donghyeon
      </p>
    </footer>
  );
};

export default Footer;
