import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { reveal, revealDelay } from '../utils/motion';
import './Portfolio.css';

const Portfolio = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);
  const { language } = useLanguage();
  const t = content[language].portfolio;

  const selectedProject = t.projects.find(p => p.id === selectedId);

  // 임팩트 순 노출 (현업 성과 · 수치 · 외부 검증 우선)
  const impactOrder = t.order;
  const byImpact = (a, b) => impactOrder.indexOf(a.id) - impactOrder.indexOf(b.id);

  // Featured projects live in the Cases section; this list holds the rest.
  const caseIds = content[language].cases.map(c => c.projectId);
  const others = t.projects.filter(p => !caseIds.includes(p.id));

  const filteredProjects = (filter === 'all'
    ? others
    : others.filter(project => project.category === t.filters[filter])
  ).slice().sort(byImpact);

  // 「전체」에서는 앞 6개만 먼저 보여 주고 나머지는 접어 둔다. 카테고리를 고르면 전부 보여 준다.
  const FRONT = 6;
  const collapsible = filter === 'all' && filteredProjects.length > FRONT;
  const visibleProjects = collapsible && !expanded ? filteredProjects.slice(0, FRONT) : filteredProjects;

  // 펼친 직후 새로 나온 첫 카드로 포커스를 옮겨 키보드 사용자가 이어서 읽게 한다.
  const justExpanded = useRef(false);
  useEffect(() => {
    if (!justExpanded.current) return;
    justExpanded.current = false;
    listRef.current?.children[FRONT]?.querySelector('button')?.focus();
  }, [expanded]);

  return (
    <section id="other" className="section portfolio-section">
      <div className="container">
        <motion.h2 className="section-title" {...reveal}>{t.title}</motion.h2>

        {/* Filter Buttons */}
        <motion.div className="portfolio-filters" {...revealDelay(0.1)}>
          {Object.keys(t.filters).map(key => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {t.filters[key]}
            </button>
          ))}
        </motion.div>

        <motion.ul id="other-grid" ref={listRef} className="other-grid" {...revealDelay(0.15)}>
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <button type="button" className="other-card" onClick={() => setSelectedId(project.id)}>
                <span className="other-cat">{project.category}</span>
                <span className="other-title">{project.title}</span>
                {t.metrics[project.id] && <span className="other-metric">{t.metrics[project.id]}</span>}
                <span className="other-desc">{project.how}</span>
                <span className="other-foot">
                  <span className="other-tech">
                    {project.details.tech.slice(0, 4).map((x) => <span key={x} className="tech-tag">{x}</span>)}
                  </span>
                  <span className="read-more">{t.modal.detail} &rarr;</span>
                </span>
              </button>
            </li>
          ))}
        </motion.ul>

        {collapsible && (
          <button
            type="button"
            className="other-more"
            aria-expanded={expanded}
            aria-controls="other-grid"
            onClick={() => { justExpanded.current = !expanded; setExpanded(!expanded); }}
          >
            {expanded ? t.showLess : `${t.showMore} (${filteredProjects.length - FRONT})`} <FaChevronDown className="chev" aria-hidden="true" />
          </button>
        )}

        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="modal-overlay"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedId(null)}>
                  <FaTimes />
                </button>
                
                <div className="modal-header">
                  {selectedProject.image && (
                    <details className="case-diagram-wrap">
                      <summary>{content[language].sections.diagram}</summary>
                      <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                    </details>
                  )}
                  <div className="modal-title-row">
                    <div>
                      <span className="modal-category">{selectedProject.category}</span>
                      <h2>{selectedProject.title}</h2>
                    </div>
                    <div className="modal-links">
                      {selectedProject.links.github && (
                        <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                          <FaGithub /> {t.modal.links.github}
                        </a>
                      )}
                      {selectedProject.links.demo && (
                        <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer" className="icon-link">
                          <FaExternalLinkAlt /> {t.modal.links.demo}
                        </a>
                      )}
                      {selectedProject.links.article && (
                        <a href={selectedProject.links.article} target="_blank" rel="noopener noreferrer" className="icon-link">
                          <FaFileAlt /> {t.modal.links.article}
                        </a>
                      )}
                      {selectedProject.links.paper && (
                        <a href={selectedProject.links.paper} target="_blank" rel="noopener noreferrer" className="icon-link">
                          <FaFileAlt /> {t.modal.links.paper}
                        </a>
                      )}
                      {(selectedProject.links.papers || []).map(paper => (
                        <a key={paper.url} href={paper.url} target="_blank" rel="noopener noreferrer" className="icon-link">
                          <FaFileAlt /> {paper.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-section">
                    <h3>{t.modal.overview}</h3>
                    <p>{selectedProject.description}</p>
                    {['problem', 'decision', 'result', 'learned'].map(key => selectedProject.details[key] && (
                      <div key={key} className="modal-block">
                        <h4>{t.modal[key]}</h4>
                        <p>{selectedProject.details[key]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="modal-row">
                    <div className="modal-col">
                      <h3>{t.modal.role}</h3>
                      <p>{selectedProject.details.role}</p>
                    </div>
                    <div className="modal-col">
                      <h3>{t.modal.techStack}</h3>
                      <div className="tech-tags">
                        {selectedProject.details.tech.map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedProject.details.features?.length > 0 && (
                    <div className="modal-section">
                      <h3>{t.modal.keyFeatures}</h3>
                      <ul className="feature-list">
                        {selectedProject.details.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
