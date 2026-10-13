// Shared scroll-reveal presets. Spread onto any motion.* element so the
// existing tag/class stays put and CSS layout is untouched.

const EASE = [0.22, 1, 0.36, 1];

export const reveal = {
  // Start partly visible so a fast scroll never lands on an empty section.
  initial: { opacity: 0.35, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -40px 0px' },
  transition: { duration: 0.5, ease: EASE },
};

// Same reveal, offset in time — for staggering siblings by index.
export const revealDelay = (delay) => ({
  ...reveal,
  transition: { ...reveal.transition, delay },
});
