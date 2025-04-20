import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const colorFluctuate = keyframes`
  0%, 100% {
    color: var(--green-tint);
  }
  50% {
    color: var(--dark-green);
  }
`;

const StyledHeroSection = styled.section`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  padding: 0;

  .container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    align-items: center;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }

  h1 {
    margin: 0 0 30px 0;
    color: var(--light-green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-xl), 5vw, var(--fz-md));
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

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 20px 30px;
    }
  }
`;

const StyledText = styled.div`
  .nameWrapper {
    display: flex;
    flex-direction: column;
    color: var(--green);
  }

  .firstName,
  .lastName {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: bold;
    line-height: 1;
  }

  .lastName {
    margin-top: -10px;
    display: flex;
    color: var(--green-tint);
  }
  .temdeg {
    margin-left: 1px;
    animation: ${colorFluctuate} 2s infinite;
    display: inline;
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 30px;
    background-color: var(--green-tint);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const TextRotator = () => {
  const [index, setIndex] = useState(0);
  const texts = [
    'Nice to meet you!',
    "I'm a senior at Dickinson College.",
    'As an ISTP, I love building, breaking, and exploring new things in software development.',
    "I'm also a fanatic for good coffee and tea.",
    "These days, I've been playing Hay Day and Sudoku for stress relief.",
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

const Hero = () => {
  const revealContainer = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

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
  const buttons = (
    <div className="buttons">
      <a
        className="email-link"
        href="https://www.linkedin.com/in/udvale"
        target="_blank"
        rel="noreferrer">
        Say Hi!
      </a>
      <a
        className="resume-link"
        href="https://drive.google.com/file/d/1OAjsVNo9synVH5wWBO3csaa8IQfmMnEd/view"
        target="_blank"
        rel="noreferrer">
        Resume!
      </a>
    </div>
  );

  const items = [one, two, three, buttons, <StyledPic key="pic" />];

  return (
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
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me4.jpg"
              width={900}
              height={1100}
              quality={100}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
