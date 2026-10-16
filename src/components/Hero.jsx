import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt, FaFilePdf } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];
const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedin, 'AWS Article': FaFileAlt };

const fade = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: EASE },
});

const Hero = () => {
  const { language } = useLanguage();
  const t = content[language].hero;

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container" key={language}>
        <motion.p className="hero-label" {...fade(0)}>{t.label}</motion.p>
        <motion.h1 className="hero-title" {...fade(0.05)}>{t.title}</motion.h1>
        <motion.p className="hero-description" {...fade(0.1)}>{t.description.split('\n')[0]}</motion.p>

        <motion.ul className="hero-highlights" {...fade(0.15)}>
          {t.highlights.map((h) => <li key={h.label}><span className="hero-hl-label">{h.label}</span><span>{h.text}</span></li>)}
        </motion.ul>

        <motion.div className="hero-links" {...fade(0.2)}>
          {t.links.map(({ label, url }) => {
            const Icon = ICONS[label] || FaFilePdf;
            return (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={`hero-link${ICONS[label] ? '' : ' primary'}`}>
                <Icon aria-hidden="true" /> {label}
              </a>
            );
          })}
        </motion.div>

        <motion.ul className="hero-stack" {...fade(0.25)}>
          {t.stack.map((s) => <li key={s}>{s}</li>)}
        </motion.ul>
      </div>
    </section>
  );
};

export default Hero;
