import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import { reveal, revealDelay } from '../utils/motion';
import './Resume.css';

const Resume = () => {
  const { language } = useLanguage();
  const t = content[language].resume;

  const skills = [
    { name: 'AWS', level: 95 },
    { name: 'Notion', level: 92 },
    { name: 'Kubernetes', level: 90 },
    { name: 'Terraform', level: 90 },
    { name: 'Docker', level: 90 },
    { name: 'GCP', level: 85 },
    { name: 'CI/CD', level: 85 },
    { name: 'Golang', level: 80 },
    { name: 'Python', level: 80 },
    { name: 'Datadog', level: 75 },
    { name: 'Azure', level: 70 },
  ];

  // Language-specific PDF (resume_kr.pdf / resume_en.pdf / resume_jp.pdf)
  const resumePath = `${import.meta.env.BASE_URL}assets/${t.pdfFile}`;

  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        <motion.div className="resume-header-row" {...reveal}>
          <h2 className="section-title">{t.title}</h2>
          <motion.a
            href={resumePath}
            download
            className="btn-download"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaDownload /> {t.download}
          </motion.a>
        </motion.div>

        <div className="resume-grid">
          {/* Left Column: Skills */}
          <motion.div className="skills-column" {...revealDelay(0.1)}>
            <h3>{t.skillsTitle}</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, delay: index * 0.06, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: PDF Viewer */}
          <motion.div className="pdf-column" {...revealDelay(0.2)}>
            <div className="pdf-viewer">
              <object data={resumePath} type="application/pdf" width="100%" height="800px">
                <iframe src={resumePath} width="100%" height="800px" title="Resume PDF">
                  <p>This browser does not support PDFs. Please download the PDF to view it: <a href={resumePath}>Download PDF</a>.</p>
                </iframe>
              </object>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
