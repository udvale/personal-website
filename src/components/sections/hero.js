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
    margin: 0 auto; /* center the grid inside the section */

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

const IconsLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  pointer-events: none;

  .icon {
    position: absolute;
    width: 56px;
    height: 56px;
    pointer-events: auto;
    cursor: grab;
    user-select: none;
    touch-action: none;
    transform: translate(-50%, -50%);
    transition: transform 90ms linear;
    image-rendering: auto;
    opacity: 0.98;
    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.55));
  }

  .icon:active {
    cursor: grabbing;
    transition: none;
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

const EXCLUSION = { x1: 0.2, x2: 0.8, y1: 0.15, y2: 0.75 };

const Hero = () => {
  const revealContainer = useRef(null);
  const logos = [
    { id: 'bagel', src: bagel },
    { id: 'coffee', src: coffee },
    { id: 'croissont', src: croissont },
    { id: 'cup', src: cup },
    { id: 'latte', src: latte },
    { id: 'pancake', src: pancake },

    // Duplicate set
    { id: 'cup-2', src: cup },
    { id: 'latte-2', src: latte },
    { id: 'pancake-2', src: pancake },
    { id: 'bagel-2', src: bagel },
    { id: 'coffee-2', src: coffee },
    { id: 'croissont-2', src: croissont },
  ];

  const [iconPositions, setIconPositions] = useState({});
  const draggingRef = useRef(null);
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
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
      { xPct: 0.06, yPct: 0.4 },
      { xPct: 0.94, yPct: 0.35 }, 
      { xPct: 0.28, yPct: 0.78 }, 
      { xPct: 0.82, yPct: 0.62 }, 
      { xPct: 0.15, yPct: 0.88 }, 
      { xPct: 0.75, yPct: 0.45 }, 

      { xPct: 0.10, yPct: 0.15 },
      { xPct: 0.88, yPct: 0.80 },
      { xPct: 0.05, yPct: 0.65 },
      { xPct: 0.82, yPct: 0.18 },
      { xPct: 0.12, yPct: 0.55 },
      { xPct: 0.85, yPct: 0.62 },
    ];

    const positions = {};
    logos.forEach((l, i) => {
      const jitter = 0.04;
      const base = basePositions[i % basePositions.length];
      let xPct = Math.min(0.98, Math.max(0.02, base.xPct + (Math.random() * jitter * 2 - jitter)));
      let yPct = Math.min(0.98, Math.max(0.12, base.yPct + (Math.random() * jitter * 2 - jitter)));
      if (
        xPct >= EXCLUSION.x1 &&
        xPct <= EXCLUSION.x2 &&
        yPct >= EXCLUSION.y1 &&
        yPct <= EXCLUSION.y2
      ) {
        if (xPct < 0.5) {
          xPct = 0.06;
        } else {
          xPct = 0.94;
        }
      }

      positions[l.id] = { xPct, yPct };
    });
    setIconPositions(positions);
  }, []);

  useEffect(() => {
    const onPointerMove = e => {
      const id = draggingRef.current;
      if (!id) return;
      const { x: ox, y: oy } = pointerOffsetRef.current;
      const xPct = Math.min(0.99, Math.max(0.01, (e.clientX - ox) / window.innerWidth));
      const yPct = Math.min(0.99, Math.max(0.01, (e.clientY - oy) / window.innerHeight));
      setIconPositions(prev => ({ ...prev, [id]: { xPct, yPct } }));
    };

    const onPointerUp = () => {
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
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = id;
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
  const buttons = null;

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

      {Object.keys(iconPositions).length > 0 && (
        <IconsLayer aria-hidden="false">
          {logos.map(l => {
            const pos = iconPositions[l.id] || { xPct: 0.5, yPct: 0.5 };
            return (
              <img
                key={l.id}
                src={l.src}
                alt=""
                className="icon"
                draggable={false}
                onPointerDown={e => onIconPointerDown(e, l.id)}
                style={{ left: `${pos.xPct * 100}%`, top: `${pos.yPct * 100}%` }}
              />
            );
          })}
        </IconsLayer>
      )}
    </>
  );
};

export default Hero;
