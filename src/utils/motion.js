// Shared scroll-reveal presets. Spread onto any motion.* element so the
// existing tag/class stays put and CSS layout is untouched.

const EASE = [0.22, 1, 0.36, 1];

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: EASE },
};

// Same reveal, offset in time — for staggering siblings by index.
export const revealDelay = (delay) => ({
  ...reveal,
  transition: { ...reveal.transition, delay },
});
