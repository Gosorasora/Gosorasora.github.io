import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { FaPuzzlePiece } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../data/content';
import './Intro.css';

const EASE = [0.22, 1, 0.36, 1];
const ME = '#F4B860';      // the narrator, always the warm figure
const OTHER = '#778DA9';
const DIM = '#415A77';

// Timeline (fraction of the pinned scroll): name, value line, three chapters, then the page.
const NAME_END = 0.12;
const VALUE_END = 0.22; // the thesis line sits between the name and the chapters
const CH_START = 0.22;
const CH_LEN = (1 - CH_START) / 3; // chapters fill the rest, so the page rises right after the last one

// Flat person: head + rounded shoulders, feet at (0,0).
const Person = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-36" r="12" fill={color} />
    <path d="M-17 0 Q-17 -22 0 -22 Q17 -22 17 0 Z" fill={color} />
  </g>
);

// Fades/rises an SVG group in over [a, b] of a chapter's local progress.
const Pop = ({ lp, a, b, out, children, dy = 14 }) => {
  const opacity = useTransform(lp, out ? [a, b, out[0], out[1]] : [a, b], out ? [0, 1, 1, 0] : [0, 1]);
  const y = useTransform(lp, [a, b], [dy, 0]);
  return <motion.g style={{ opacity, y }}>{children}</motion.g>;
};

const Bubble = ({ x, y, text, color = '#fff', ink = '#1B263B' }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="-22" y="-20" width="44" height="32" rx="10" fill={color} />
    <path d="M-6 12 L0 22 L6 12 Z" fill={color} />
    <text x="0" y="3" textAnchor="middle" fontSize="18" fontWeight="800" fill={ink}>{text}</text>
  </g>
);

const CommunityScene = ({ lp }) => {
  const seats = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) seats.push([80 + c * 60 + (r % 2) * 20, 270 + r * 38]);
  // I start in the front-row centre seat, listening, then walk up to the stage.
  const meY = useTransform(lp, [0.4, 0.56], [0, -70]);
  const meScale = useTransform(lp, [0.4, 0.56], [0.75, 1.2]);
  const wave = useTransform(lp, [0.7, 0.78], [0, 1]);
  const early = new Set([1, 2, 3, 5, 6, 7]);
  return (
    <svg viewBox="0 0 640 380" className="intro-svg" role="img" aria-hidden="true">
      <Pop lp={lp} a={0.02} b={0.1}>
        <rect x="190" y="20" width="260" height="130" rx="10" fill="#fff" />
        <image href="/assets/logos/amazonwebservices-original-wordmark.svg" x="215" y="40" width="95" height="90" />
        <image href="/assets/logos/notion-original.svg" x="345" y="52" width="66" height="66" />
        <rect x="140" y="200" width="360" height="12" rx="4" fill={DIM} />
      </Pop>
      <Pop lp={lp} a={0.04} b={0.12} out={[0.32, 0.4]}><Person x={320} y={200} color={OTHER} s={1.2} /></Pop>
      <Pop lp={lp} a={0.1} b={0.16} out={[0.32, 0.38]}>
        <text x="20" y="40" fontSize="24" fontWeight="800" fill="#9aa8bb">2022</text>
        <text x="20" y="62" fontSize="13" fontWeight="600" fill="#9aa8bb">Member</text>
      </Pop>
      <Pop lp={lp} a={0.6} b={0.68}>
        <text x="20" y="40" fontSize="24" fontWeight="800" fill={ME}>2026</text>
        <text x="20" y="62" fontSize="13" fontWeight="600" fill={ME}>Leader</text>
      </Pop>
      {seats.map(([x, y], i) => i !== 4 && (
        <Pop key={i} lp={lp} a={early.has(i) ? 0.06 : 0.56 + i * 0.01} b={early.has(i) ? 0.12 : 0.6 + i * 0.01}>
          <Person x={x} y={y} color={i % 4 === 0 ? '#9aa8bb' : OTHER} s={0.75} />
        </Pop>
      ))}
      <Pop lp={lp} a={0.06} b={0.12}>
        <motion.g style={{ y: meY, scale: meScale, transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          <Person x={320} y={270} color={ME} />
        </motion.g>
      </Pop>
      <motion.g style={{ opacity: wave }}>
        <path d="M352 150 q12 12 0 24" stroke={ME} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M362 142 q20 20 0 40" stroke={ME} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      </motion.g>
    </svg>
  );
};

const AxScene = ({ lp }) => {
  const meX = useTransform(lp, [0.28, 0.46], [-260, 0]);
  const papers = useTransform(lp, [0.6, 0.7], [1, 0]);
  return (
    <svg viewBox="0 0 640 380" className="intro-svg" role="img" aria-hidden="true">
      <Pop lp={lp} a={0.02} b={0.1}>
        <Person x={500} y={300} color={OTHER} s={1.1} />
        <rect x="360" y="296" width="230" height="12" rx="4" fill={DIM} />
      </Pop>
      <motion.g style={{ opacity: papers }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Pop key={i} lp={lp} a={0.06 + i * 0.03} b={0.1 + i * 0.03} dy={-20}>
            <rect x={385 + (i % 2) * 4} y={282 - i * 12} width="50" height="10" rx="2" fill="#E0E1DD" />
          </Pop>
        ))}
      </motion.g>
      <Pop lp={lp} a={0.16} b={0.24} out={[0.62, 0.68]}><Bubble x={540} y={200} text="!" color="#E26D5C" ink="#fff" /></Pop>
      <motion.g style={{ x: meX }}>
        <Pop lp={lp} a={0.26} b={0.3}><Person x={290} y={300} color={ME} s={1.1} /></Pop>
      </motion.g>
      <Pop lp={lp} a={0.48} b={0.54} out={[0.6, 0.66]}><Bubble x={300} y={200} text="?" /></Pop>
      <Pop lp={lp} a={0.62} b={0.72}>
        <rect x="372" y="200" width="76" height="76" rx="16" fill="#fff" />
        <FaPuzzlePiece x="386" y="214" size={48} color={ME} />
      </Pop>
      <Pop lp={lp} a={0.72} b={0.8}><Bubble x={540} y={200} text="✓" color="#7BC67E" ink="#fff" /></Pop>
    </svg>
  );
};

// Monitoring chart in three acts: calm, incident spike, recovery after the fix.
const CALM = 'M200 200 L230 192 L260 196 L290 188';
const SPIKE = 'M290 188 L305 112 L320 90 L335 100';
const RECOVER = 'M335 100 L360 170 L390 192 L420 188 L455 194';

const Line = ({ lp, d, color, a, b }) => {
  const pathLength = useTransform(lp, [a, b], [0, 1]);
  const opacity = useTransform(lp, [a, a + 0.01], [0, 1]); // hide the round-cap dot before drawing starts
  return <motion.path d={d} stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength, opacity }} />;
};

const DevopsScene = ({ lp }) => {
  const meX = useTransform(lp, [0.36, 0.5], [-220, 0]);
  return (
    <svg viewBox="0 0 640 380" className="intro-svg" role="img" aria-hidden="true">
      <Pop lp={lp} a={0.02} b={0.1}>
        <rect x="180" y="40" width="300" height="210" rx="12" fill="#fff" />
        <image href="/assets/logos/datadog.svg" x="196" y="54" width="28" height="28" />
        <text x="232" y="74" fontSize="15" fontWeight="700" fill="#1B263B">Monitoring</text>
        <line x1="200" y1="226" x2="460" y2="226" stroke="#d0d4da" strokeWidth="1" />
      </Pop>
      <Pop lp={lp} a={0.02} b={0.1} out={[0.26, 0.3]}><circle cx="458" cy="68" r="7" fill="#2DA44E" /></Pop>
      <Pop lp={lp} a={0.26} b={0.3} out={[0.68, 0.72]}><circle cx="458" cy="68" r="7" fill="#E26D5C" /></Pop>
      <Pop lp={lp} a={0.68} b={0.72}><circle cx="458" cy="68" r="7" fill="#2DA44E" /></Pop>
      <Line lp={lp} d={CALM} color="#632CA6" a={0.06} b={0.24} />
      <Line lp={lp} d={SPIKE} color="#E26D5C" a={0.24} b={0.32} />
      <Line lp={lp} d={RECOVER} color="#2DA44E" a={0.68} b={0.84} />
      {[440, 510, 580].map((x, i) => (
        <g key={x}>
          <Pop lp={lp} a={0.04 + i * 0.03} b={0.1 + i * 0.03}><Person x={x} y={340} color={OTHER} /></Pop>
          <Pop lp={lp} a={0.3 + i * 0.02} b={0.36 + i * 0.02} out={[0.66, 0.7]}><Bubble x={x} y={268} text="!" color="#E26D5C" ink="#fff" /></Pop>
          <Pop lp={lp} a={0.84 + i * 0.02} b={0.9 + i * 0.02}><Bubble x={x} y={268} text="✓" color="#7BC67E" ink="#fff" /></Pop>
        </g>
      ))}
      <motion.g style={{ x: meX }}>
        <Pop lp={lp} a={0.34} b={0.38}><Person x={110} y={340} color={ME} s={1.2} /></Pop>
      </motion.g>
      <Pop lp={lp} a={0.5} b={0.58} out={[0.68, 0.74]}>
        <circle cx="320" cy="100" r="24" stroke={ME} strokeWidth="5" fill="rgba(244,184,96,0.15)" />
        <line x1="337" y1="117" x2="356" y2="136" stroke={ME} strokeWidth="6" strokeLinecap="round" />
      </Pop>
    </svg>
  );
};

const SCENES = [CommunityScene, AxScene, DevopsScene];

// Progress dot: lit while the scroll is inside [a, b].
const Dot = ({ progress, a, b }) => {
  const opacity = useTransform(progress, [a - 0.001, a, b - 0.001, b], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [a - 0.001, a, b - 0.001, b], [1, 1.4, 1.4, 1]);
  return <motion.span className="intro-dot" style={{ opacity, scale }} />;
};

const Chapter = ({ progress, i, chapter, last }) => {
  const start = CH_START + i * CH_LEN;
  const lp = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - start) / CH_LEN)));
  const opacity = useTransform(lp, [0, 0.06, 0.92, 1], [0, 1, 1, last ? 1 : 0]);
  const textY = useTransform(lp, [0, 0.12], [24, 0]);
  const Scene = SCENES[i];
  return (
    <motion.div className="intro-chapter" style={{ opacity }}>
      <Scene lp={lp} />
      <motion.div className="intro-caption" style={{ y: textY }}>
        <span className="intro-tag">{chapter.kicker} · {chapter.tag}</span>
        <h3 className="intro-chapter-title">{chapter.title}</h3>
        <p className="intro-chapter-body">{chapter.body}</p>
      </motion.div>
    </motion.div>
  );
};

const Intro = () => {
  const { language } = useLanguage();
  const t = content[language].hero;
  const { chapters, value: valueLine, skip } = content[language].intro || content.kr.intro;
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Read the section's own position; useScroll's ScrollTimeline path mis-measured pinned sections.
  const progress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      progress.set(Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [progress, reduced]);

  const nameOpacity = useTransform(progress, [NAME_END - 0.04, NAME_END], [1, 0]);
  const nameScale = useTransform(progress, [0, NAME_END], [1, 0.9]);
  const lineOpacity = useTransform(progress, [NAME_END - 0.02, NAME_END + 0.02, VALUE_END - 0.03, VALUE_END], [0, 1, 1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.03], [1, 0]);
  // black opening hands over to the navy hero without a seam
  const navyOpacity = useTransform(progress, [0.9, 1], [0, 1]);
  const skipOpacity = useTransform(progress, [0.94, 1], [1, 0]);

  const skipToPage = () => {
    const hero = document.getElementById('home');
    if (hero) window.scrollTo({ top: hero.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  };

  if (reduced) return null;

  const letters = [...t.title];

  return (
    <section ref={ref} className="intro" aria-label={t.title}>
      <div className="intro-stage">
        <motion.div className="intro-navy" style={{ opacity: navyOpacity }} aria-hidden="true" />
        <motion.div className="intro-name" style={{ opacity: nameOpacity, scale: nameScale }}>
          <h2 className="intro-title" aria-label={t.title}>
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.045, duration: 0.6, ease: EASE }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {chapters.map((ch, i) => <Chapter key={i} progress={progress} i={i} chapter={ch} last={i === chapters.length - 1} />)}

        <motion.p className="intro-line" style={{ opacity: lineOpacity }}>{valueLine}</motion.p>

        <div className="intro-dots" aria-hidden="true">
          {[[NAME_END, VALUE_END], ...chapters.map((_, i) => [CH_START + i * CH_LEN, CH_START + (i + 1) * CH_LEN])].map(([a, b]) => (
            <Dot key={a} progress={progress} a={a} b={b} />
          ))}
        </div>

        <motion.button type="button" className="intro-skip" style={{ opacity: skipOpacity }} onClick={skipToPage}>
          {skip} <span aria-hidden="true">↓</span>
        </motion.button>

        <motion.div className="intro-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          <span>Scroll</span>
          <span className="intro-hint-arrow">↓</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
