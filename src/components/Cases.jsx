import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { reveal } from '../utils/motion';
import './Cases.css';

const bullets = (t) => t.split(/(?<=[.!?])\s+/).filter(Boolean);
const NUM = /(?<![A-Za-z])(v?\d[\d.,~]*(?:\s?(?:초|개|건|원|대|시간|분|h|%|ms|s))?)(?![A-Za-z])/g;
const withBold = (t) => t.split(NUM).map((x, i) => (i % 2 ? <strong key={i}>{x}</strong> : x));

const Case = ({ c, project, index, s, onZoom }) => {
  const [hasDiagram, setHasDiagram] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <motion.article className="case" {...reveal}>
      <header className="case-head">
        <span className="case-num">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="case-title">{project.title}</h3>
          <p className="case-outcome">{withBold(c.outcome)}</p>
          <p className="case-how">{project.how}</p>
        </div>
      </header>

      <div className="case-actions">
        {c.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="icon-link">
            <FaExternalLinkAlt aria-hidden="true" /> {l.label}
          </a>
        ))}
        <button type="button" className="case-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
          {s.more} {open ? '▴' : '▾'}
        </button>
      </div>

      {open && (
        <div className="case-detail">
          <p className="case-summary">{c.summary}</p>

          {c.diagram && hasDiagram && (
            <button type="button" className="case-diagram" onClick={() => onZoom(c.diagram)} aria-label={s.zoom}>
              <img src={c.diagram} alt={project.title} loading="lazy" onError={() => setHasDiagram(false)} />
            </button>
          )}

          <div className="case-pdr">
            {[['problem', false], ['decision', false], ['result', true]].map(([k, bold]) => (
              <section key={k} className={`case-col case-${k}`}>
                <h4>{s[k]}</h4>
                <ul>
                  {bullets(c[k]).map((b, i) => <li key={i}>{bold ? withBold(b) : b}</li>)}
                </ul>
              </section>
            ))}
          </div>

          <div className="case-full">
            <p>{project.details.problem}</p>
            <p>{project.details.solution}</p>
          </div>
        </div>
      )}
    </motion.article>
  );
};

const Cases = () => {
  const { language } = useLanguage();
  const { cases, sections: s, portfolio } = content[language];
  const [zoomSrc, setZoomSrc] = useState(null);

  return (
    <section id="cases" className="section cases-section">
      <div className="container">
        <motion.h2 className="section-title" {...reveal}>{s.cases}</motion.h2>
        {cases.map((c, i) => (
          <Case
            key={`${language}-${c.projectId}`}
            c={c}
            project={portfolio.projects.find((p) => p.id === c.projectId)}
            index={i}
            s={s}
            onZoom={setZoomSrc}
          />
        ))}
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            className="modal-overlay"
            onClick={() => setZoomSrc(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="modal-close" onClick={() => setZoomSrc(null)} aria-label="Close">
              <FaTimes />
            </button>
            <img className="lightbox-img" src={zoomSrc} alt="" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cases;
