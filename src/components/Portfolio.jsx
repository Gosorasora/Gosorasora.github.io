import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaFileAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { reveal, revealDelay } from '../utils/motion';
import './Portfolio.css';

const Portfolio = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all');
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

        <motion.ul className="other-grid" {...revealDelay(0.15)}>
          {filteredProjects.map((project) => (
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
                  {selectedProject.image && <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />}
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
                    <p>{selectedProject.details.problem}</p>
                    <p>{selectedProject.details.solution}</p>
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

                  <div className="modal-section">
                    <h3>{t.modal.keyFeatures}</h3>
                    <ul className="feature-list">
                      {selectedProject.details.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
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
