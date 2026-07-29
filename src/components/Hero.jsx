import React, { useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];

// Splits a string into animated units. Chars read as one flowing wipe but cost
// a node each — use them on short headlines only, words on longer lines.
const SplitText = ({ text, by = 'char', delay = 0, step = 0.03, blur = false, className }) => {
  const units = by === 'char' ? text.split('') : text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="split-unit"
          initial={{
            opacity: 0,
            y: '0.5em',
            ...(blur ? { filter: 'blur(10px)' } : null),
          }}
          animate={{
            opacity: 1,
            y: 0,
            ...(blur ? { filter: 'blur(0px)' } : null),
          }}
          transition={{ delay: delay + i * step, duration: 0.7, ease: EASE }}
        >
          {unit === ' ' ? ' ' : unit}
          {by === 'word' && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const { language } = useLanguage();
  const t = content[language].hero;
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  // Scroll-linked: content drifts up and dissolves, background creeps in.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Cursor spotlight. Springs smooth the raw pointer into something that glides.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spotX = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const spotY = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });

  const handlePointerMove = useCallback(
    (e) => {
      if (reduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [reduced, rawX, rawY]
  );

  const handleViewWork = (e) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="hero-section"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="hero-bg"
        style={{ scale: bgScale, y: bgY }}
        aria-hidden="true"
      />

      {/* Infra grid: slow vertical drift, masked out at the edges. */}
      {!reduced && (
        <div className="hero-grid-mask" aria-hidden="true">
          <motion.div
            className="hero-grid"
            animate={{ y: [0, -60] }}
            transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}

      {!reduced && (
        <motion.div
          className="hero-spotlight"
          style={{ x: spotX, y: spotY }}
          aria-hidden="true"
        />
      )}

      <motion.div
        className="container hero-container"
        style={{ y: contentY, opacity: contentOpacity }}
        key={language}
      >
        <motion.h1
          className="hero-greeting"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="greeting-rule" aria-hidden="true" />
          {t.greeting}
        </motion.h1>

        <h2 className="hero-title">
          <SplitText text={t.title} by="char" delay={0.25} step={0.035} blur />
        </h2>

        <h3 className="hero-subtitle">
          <SplitText text={t.subtitle} by="word" delay={0.7} step={0.06} />
        </h3>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
        >
          {t.description.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br className="desktop-break" />}
            </React.Fragment>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            onClick={handleViewWork}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            {t.cta}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        aria-hidden="true"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.span
          className="scroll-dot"
          animate={reduced ? {} : { y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
