import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { reveal } from '../utils/motion';
import './Cases.css';

const Writing = () => {
  const { language } = useLanguage();
  const { writing, sections } = content[language];

  return (
    <section id="writing" className="section">
      <div className="container">
        <motion.h2 className="section-title" {...reveal}>{sections.writing}</motion.h2>
        <motion.ul className="writing-list" {...reveal}>
          {writing.map((w) => (
            <li key={w.url}>
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="writing-item">
                <span className="writing-kind">{w.kind}</span>
                <span className="writing-title">{w.title} &rarr;</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Writing;
