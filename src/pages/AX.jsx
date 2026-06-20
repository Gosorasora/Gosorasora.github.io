import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import './AX.css';

const AX = () => {
  const { language } = useLanguage();
  const t = content[language].ax;

  return (
    <div className="ax-page-container">
      <div className="container">
        {/* Header */}
        <motion.div
          className="ax-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="ax-title">{t.title}</h1>
          <p className="ax-subtitle">{t.subtitle}</p>
          <p className="ax-intro">{t.intro}</p>
        </motion.div>

        {/* Stats Strip */}
        <div className="ax-stats">
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="ax-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <span className="ax-stat-value">{stat.value}</span>
              <span className="ax-stat-label">{stat.label}</span>
              <span className="ax-stat-note">{stat.note}</span>
            </motion.div>
          ))}
        </div>

        {/* Timeline of Initiatives */}
        <div className="ax-timeline">
          {t.initiatives.map((item, i) => (
            <motion.div
              key={i}
              className="ax-timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
            >
              <div className="ax-timeline-marker" />
              <div className="ax-card">
                <span className="ax-period">{item.period}</span>
                <h3 className="ax-card-title">{item.title}</h3>
                <p className="ax-card-summary">{item.summary}</p>
                <ul className="ax-points">
                  {item.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
                <div className="ax-tags">
                  {item.tech.map((tech, k) => (
                    <span key={k} className="ax-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AX;
