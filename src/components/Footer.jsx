import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const EMAIL = 'kodh0204@gmail.com';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://github.com/Gosorasora" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/kosora" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <button
          type="button"
          className="email-copy-btn"
          onClick={handleCopyEmail}
          aria-label={copied ? 'Email copied' : `Copy email ${EMAIL}`}
          title={copied ? 'Copied!' : EMAIL}
        >
          <FaEnvelope />
          {copied && <span className="copied-tooltip">Copied!</span>}
        </button>
      </div>
      <p className="copyright">
        Designed &amp; Built by Ko Donghyeon
      </p>
    </footer>
  );
};

export default Footer;
