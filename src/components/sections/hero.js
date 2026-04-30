import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import bagel from '../../images/logos/bagel.png';
import coffee from '../../images/logos/coffee.png';
import croissont from '../../images/logos/croissont.png';
import cup from '../../images/logos/cup.png';
import latte from '../../images/logos/latte.png';
import pancake from '../../images/logos/pancake.png';
import cosmetic from '../../images/logos/cosmetic.png';
import mirror from '../../images/logos/mirror.png';
import cosmetics from '../../images/logos/cosmetics.png';
import flower from '../../images/logos/flower.png';
import project from '../../images/logos/project-status.png';
import skincare from '../../images/logos/skincare.png';
import creativity from '../../images/logos/creativity.png';
import greentea from '../../images/logos/green-tea.png';
import happy from '../../images/logos/happy.png';
import sunflower from '../../images/logos/sunflower.png';
import pisces from '../../images/logos/pisces.png';


const colorFluctuate = keyframes`
  0%, 100% {
    color: var(--green-tint);
  }
  50% {
    color: var(--dark-green);
  }
`;

const StyledHeroSection = styled.section`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 140px;
  min-height: 100vh;

  .container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    align-items: center;
    width: min(1100px, 92%);
    margin: 0 auto;

    @media (max-width: 900px) {
      width: 94%;
    }

    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 80px 0 40px 0;
    }
  }

  h1 {
    margin: 0 0 30px 0;
    color: var(--light-green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-xxl), 5vw, var(--fz-xxxl));
    font-weight: 500;
  }

  .content {
    font-size: var(--fz-xxl);
    color: var(--green);
  }

  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 50px;
  }

  .email-link,
  .resume-link {
    ${({ theme }) => theme.mixins.contactButton};

    @media (max-width: 700px) {
      font-size: 0.8rem;
      padding: auto;
    }
  }
`;

const floatBob = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-9px); }
`;

const floatSway = keyframes`
  0%, 100% { transform: rotate(-4deg) scale(1); }
  50%       { transform: rotate(4deg) scale(1.07); }
`;

const popBounce = keyframes`
  0%   { transform: scale(1); }
  25%  { transform: scale(1.45); }
  65%  { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const IconsLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  pointer-events: none;

  .icon-wrap {
    position: absolute;
    width: 56px;
    height: 56px;
    pointer-events: auto;
    cursor: grab;
    user-select: none;
    touch-action: none;
    transform: translate(-50%, -50%) rotate(var(--tilt, 0deg));
    transition: transform 0.25s ease;

    &.dragging {
      transition: none;
      cursor: grabbing;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0.98;
      filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.55));
      animation: ${floatBob} var(--float-dur, 3s) ease-in-out var(--float-delay, 0s) infinite;
      scale: 1;
      transition: scale 0.2s ease;
    }

    &.dragging img {
      animation-play-state: paused;
    }

    &:hover:not(.dragging) img {
      scale: 1.18;
    }
  }
`;

const StaticIconsLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  pointer-events: none;

  .static-icon {
    position: absolute;
    width: 56px;
    height: 56px;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      display: block;
      opacity: 0.92;
      filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.45));
      transform-origin: center bottom;
      animation: ${floatSway} var(--float-dur, 3s) ease-in-out var(--float-delay, 0s) infinite;
    }

    &.popped img {
      transform-origin: center center;
      animation: ${popBounce} 1s ease-out forwards;
    }
  }
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .nameWrapper {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 12px;
    color: var(--green);
    white-space: nowrap;
  }

  .firstName,
  .lastName {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: bold;
    line-height: 1;
    display: inline-block;
  }

  .lastName {
    margin-top: 0;
    display: inline-flex;
    color: var(--green-tint);
  }

  .temdeg {
    margin-left: 6px;
    animation: ${colorFluctuate} 2s infinite;
    display: inline;
  }

  .content {
    text-align: center;
    margin-top: 10px;
    font-size: 24px;
    color: var(--green);
  }
`;

const TextRotator = () => {
  const [index, setIndex] = useState(0);
  const texts = [
    'Nice to meet you!',
    "I'm a software developer based in Seattle",
    'As an ISTP, I love building, breaking, and exploring new things in software development.',
    "I'm also a fanatic for good coffee and tea.",
    'Plus and avid Sudoku player.',
    "Oh, and I'm an unabashed mint chocolate supporter.",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(id);
  }, [texts.length]);

  return <div className="content">{texts[index]}</div>;
};

const EXCLUSION = { x1: 0.2, x2: 0.8, y1: 0.15, y2: 0.78 };

const staticStickers = [
  { id: 'static-greentea', src: greentea, xPct: 0.344, yPct: 0.28, dur: 3.1, delay: -0.4 },
  { id: 'static-croissont', src: croissont, xPct: 0.68, yPct: 0.34, dur: 2.9, delay: -1.2 },
  { id: 'static-bagel', src: bagel, xPct: 0.295, yPct: 0.71, dur: 3.4, delay: -0.8 },
  { id: 'static-creativity', src: creativity, xPct: 0.644, yPct: 0.55, dur: 3.0, delay: -2.1 },
  { id: 'static-pisces', src: pisces, xPct: 0.54, yPct: 0.22, dur: 3.3, delay: -1.7 },
];

const Hero = () => {
  const revealContainer = useRef(null);
  const logos = [
    { id: 'pancake', src: pancake },
    { id: 'coffee', src: coffee },
    { id: 'cup', src: cup },
    { id: 'latte', src: latte },
    { id: 'cosmetic', src: cosmetic },
    { id: 'mirror', src: mirror },
    { id: 'cosmetics', src: cosmetics },
    { id: 'flower', src: flower },
    { id: 'project', src: project },
    { id: 'skincare', src: skincare },
    { id: 'happy', src: happy },
    { id: 'sunflower', src: sunflower },
  ];

  const [iconPositions, setIconPositions] = useState({});
  const [poppedSticker, setPoppedSticker] = useState(null);
  const draggingRef = useRef(null);
  const draggingElRef = useRef(null);
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (Object.keys(iconPositions).length > 0) return;
    if (!revealContainer.current) return;

    const basePositions = [
      // left column
      { xPct: 0.06, yPct: 0.18 },
      { xPct: 0.08, yPct: 0.38 },
      { xPct: 0.06, yPct: 0.56 },
      { xPct: 0.09, yPct: 0.72 },
      // right column
      { xPct: 0.92, yPct: 0.18 },
      { xPct: 0.9, yPct: 0.38 },
      { xPct: 0.92, yPct: 0.56 },
      { xPct: 0.9, yPct: 0.72 },
      // bottom row
      { xPct: 0.18, yPct: 0.88 },
      { xPct: 0.38, yPct: 0.93 },
      { xPct: 0.62, yPct: 0.93 },
      { xPct: 0.82, yPct: 0.88 },
    ];

    const positions = {};
    logos.forEach((l, i) => {
      const jitter = 0.025;
      const base = basePositions[i % basePositions.length];
      let xPct = Math.min(0.98, Math.max(0.02, base.xPct + (Math.random() * jitter * 2 - jitter)));
      let yPct = Math.min(0.98, Math.max(0.14, base.yPct + (Math.random() * jitter * 2 - jitter)));
      if (
        xPct >= EXCLUSION.x1 &&
        xPct <= EXCLUSION.x2 &&
        yPct >= EXCLUSION.y1 &&
        yPct <= EXCLUSION.y2
      ) {
        xPct = xPct < 0.5 ? 0.07 : 0.93;
      }

      positions[l.id] = { xPct, yPct };
    });
    setIconPositions(positions);
  }, []);

  useEffect(() => {
    const onPointerMove = e => {
      const id = draggingRef.current;
      if (!id) return;
      const dx = e.clientX - prevPointerRef.current.x;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
      const tilt = Math.max(-15, Math.min(15, dx * 2));
      const { x: ox, y: oy } = pointerOffsetRef.current;
      const xPct = Math.min(0.99, Math.max(0.01, (e.clientX - ox) / window.innerWidth));
      const yPct = Math.min(0.99, Math.max(0.01, (e.clientY - oy) / window.innerHeight));
      setIconPositions(prev => ({ ...prev, [id]: { xPct, yPct, tilt } }));
    };

    const onPointerUp = () => {
      const id = draggingRef.current;
      if (draggingElRef.current) {
        draggingElRef.current.classList.remove('dragging');
        draggingElRef.current = null;
      }
      if (id) {
        setIconPositions(prev => ({ ...prev, [id]: { ...prev[id], tilt: 0 } }));
      }
      draggingRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  const onIconPointerDown = (e, id) => {
    e.preventDefault();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    draggingElRef.current = el;
    draggingRef.current = id;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    setIconPositions(prev => {
      const pos = prev[id];
      if (pos) {
        pointerOffsetRef.current = {
          x: e.clientX - pos.xPct * window.innerWidth,
          y: e.clientY - pos.yPct * window.innerHeight,
        };
      }
      return prev;
    });
  };

  const one = (
    <h1>
      <span>HI THERE</span>, my name is
    </h1>
  );
  const two = (
    <div className="nameWrapper">
      <span className="firstName">Udval</span>
      <span className="lastName">
        Enkhtaivan. <span className="temdeg">|</span>
      </span>
    </div>
  );
  const three = <TextRotator />;

  const centerSpotify = (
    <div style={{ width: 520, maxWidth: '92vw', margin: '36px auto' }}>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: '12px', width: '100%', minWidth: 320 }}
        src="https://open.spotify.com/embed/playlist/4vlF3xCgAJ7LAgvWNe4Erk?utm_source=generator"
        width="340"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );

  const items = [one, two, three, centerSpotify];

  return (
    <>
      <StyledHeroSection id="home" ref={revealContainer}>
        <div className="container">
          <StyledText>
            {prefersReducedMotion ? (
              <>
                {items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </>
            ) : (
              <TransitionGroup component={null}>
                {isMounted &&
                  items.map((item, i) => (
                    <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                      <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            )}
          </StyledText>
        </div>
      </StyledHeroSection>

      <StaticIconsLayer aria-hidden="true">
        {staticStickers.map(s => (
          <span
            key={s.id}
            className={`static-icon${poppedSticker === s.id ? ' popped' : ''}`}
            onClick={() => {
              setPoppedSticker(s.id);
              setTimeout(() => setPoppedSticker(null), 2000);
            }}
            style={{
              left: `${s.xPct * 100}%`,
              top: `${s.yPct * 100}%`,
              '--float-dur': `${s.dur}s`,
              '--float-delay': `${s.delay}s`,
            }}>
            <img src={s.src} alt="" draggable={false} />
          </span>
        ))}
      </StaticIconsLayer>

      {Object.keys(iconPositions).length > 0 && (
        <IconsLayer aria-hidden="false">
          {logos.map((l, i) => {
            const pos = iconPositions[l.id] || { xPct: 0.5, yPct: 0.5 };
            const dur = (2.8 + ((i * 0.37) % 1.6)).toFixed(2);
            const delay = -((i * 0.61) % 3).toFixed(2);
            return (
              <span
                key={l.id}
                className="icon-wrap"
                onPointerDown={e => onIconPointerDown(e, l.id)}
                style={{
                  left: `${pos.xPct * 100}%`,
                  top: `${pos.yPct * 100}%`,
                  '--float-dur': `${dur}s`,
                  '--float-delay': `${delay}s`,
                  '--tilt': `${pos.tilt || 0}deg`,
                }}>
                <img src={l.src} alt="" draggable={false} />
              </span>
            );
          })}
        </IconsLayer>
      )}
    </>
  );
};

export default Hero;
