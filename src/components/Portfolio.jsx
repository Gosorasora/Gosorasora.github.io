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

  // Filter Logic
  const filterMap = {
    web: 'DevOps & Infra',
    ai: 'AX',
    research: '오픈소스',
    security: 'Security'
  };

  // 임팩트 순 노출 (현업 성과 · 수치 · 외부 검증 우선)
  const impactOrder = [1, 15, 2, 3, 4, 7, 6, 13, 14, 12, 5, 9, 8, 10, 11];
  const byImpact = (a, b) => impactOrder.indexOf(a.id) - impactOrder.indexOf(b.id);

  const filteredProjects = (filter === 'all'
    ? t.projects
    : t.projects.filter(project => project.category.includes(filterMap[filter]))
  ).slice().sort(byImpact);

  return (
    <section id="projects" className="section portfolio-section">
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

        <div className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                className="portfolio-card"
                onClick={() => setSelectedId(project.id)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="card-content">
                  <span className="card-category">{project.category}</span>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>
                  {project.details?.features && (
                    <ul className="card-highlights">
                      {project.details.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className="card-footer">
                    {project.details?.tech && (
                      <div className="card-tech">
                        {project.details.tech.slice(0, 5).map(tech => (
                          <span key={tech} className="card-tech-chip">{tech}</span>
                        ))}
                        {project.details.tech.length > 5 && (
                          <span className="card-tech-chip more">+{project.details.tech.length - 5}</span>
                        )}
                      </div>
                    )}
                    <span className="read-more">{t.modal.detail} &rarr;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
                layoutId={`card-${selectedId}`}
                className="modal-content"
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
