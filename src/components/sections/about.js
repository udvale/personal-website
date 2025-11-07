import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 140px 0;

  .inner {
    display: flex;
    font-size: var(--fz-xxl);

    @media (max-width: 768px) {
      display: block;
    }
  }

  .profile-pic {
    display: flex;
    gap: 60px;
    justify-content: center; 
    align-items: center;
    margin-top: 10px;
  }
`;

const StyledText = styled.div`
  width: 100%;

  .sub-title {
    font-size: var(--fz-xxl);
    color: var(--green);
    margin: 20px 0;
  }

  .sub-text {
    margin: 30px 0 30px 0;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(220px, 1fr));
    grid-gap: 12px 60px; /* row gap, column gap */
    padding: 0;
    margin: 20px 0 0 0;
    overflow: visible;
    list-style: none;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, minmax(180px, 1fr));
      grid-gap: 10px 36px;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-gap: 8px 0;
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: 15px;
      color: var(--light-green);
      transition: color 0.3s;
      /* avoid breaking words mid-word */
      word-break: normal;
      overflow-wrap: normal;
      white-space: normal;

      &:before {
        content: '○';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: var(--green);
        font-size: var(--fz-xs);
        line-height: 12px;
      }

      &:hover {
        color: var(--green-tint);
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 320px;
  margin: 40px auto;
  padding: 4px;

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 24px; /* round the frame */
    background-color: var(--green-tint);
    padding: 8px; /* inner padding between frame and image */

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
      border-radius: 16px; /* round the actual photo corners */
      transition: var(--transition);
      display: block;
      width: 100%;
      height: auto;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 24px;
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

  &.round {
    max-width: 320px;
    margin: 20px 10px;

    .wrapper {
      border-radius: 50%;
      padding: 3px;

      .img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:after {
        display: none;
      }
    }
  }

  &.large {
    max-width: 550px;
    margin: 40px auto;

    .wrapper {
      border-radius: 24px;
      padding: 3px;

      .img {
        border-radius: 16px;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      &:after {
        top: 18px;
        left: 18px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const certificates = [
    {
      name: 'Introduction to Azure Cloud Services',
      link: 'https://drive.google.com/file/d/1hhZrPMWVyG02kwEH8-oiph8u9c7efaf4/view',
    },
    {
      name: 'Intermediate Cybersecurity',
      link: 'https://drive.google.com/file/d/1iaqLvFdZoytDAf4EH9ObzI4ELLdHAPA2/view',
    },
    {
      name: '2023 Web Development Bootcamp',
      link: 'https://www.udemy.com/certificate/UC-4c6aeb98-8559-48e3-ba3d-3cd6fbf93be9/',
    },
    {
      name: 'Udacity - Generative AI with AWS',
      link: 'https://drive.google.com/file/d/1hvuSnlaLlQs1dL-avz_IaMyE7-TpMOSh/preview',
    },
    {
      name: 'IBM - Introduction to Project Management',
      link: 'https://www.coursera.org/account/accomplishments/certificate/8TPXBDKGQWAU',
    },
    {
      name: 'CodePath Intermediate Technical Interview Prep',
      link: 'https://drive.google.com/file/d/1Sjou7FeTqTCLadWh2gOUzE2bV7Pj7GkI/preview',
    },
    {
      name: 'Dialpad - Dialership 2024 program',
      link: 'https://drive.google.com/file/d/1h3XE9eaqjiPaFtt0zhrOJ5vvCYv0lY_5/preview',
    },
    {
      name: 'Forage - Cognizant Artificial Intelligence Simulation',
      link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Cognizant/5N2ygyhzMWjKQmgCK_Cognizant_A8Ye9jvhe2GdBy9y3_1718762487158_completion_certificate.pdf',
    },
    {
      name: 'Forage - Goldman Sachs Software Engineering Simulation',
      link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_A8Ye9jvhe2GdBy9y3_1717220354202_completion_certificate.pdf',
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              <p>
                Hi, I'm Udval, a recent Dickinson College graduate with a degree in computer
                science. I'm currently a Software Engineer, focusing on fullstack development
                especially frontend work. I love building things, solving problems, and exploring
                how technology shapes the real world. I have interests in cybersecurity, machine
                learning, and UI development.
                <br />
                <br />
                I'm currently learning about Junior Cybersecuirty path on Hack the Box to deepen my deepen my skills in cybersecurity,
                while also expanding my expertise in software development, data analysis, and
                machine learning.
                <br />
                <br />
                Currently based in Seattle and I'm always eager to collaborate, learn from others,
                and take on new challenges.
              </p>
            </p>
            <div className="profile-pic">
              <StyledPic className="round">
                <div className="wrapper">
                  <StaticImage
                    className="img"
                    src="../../images/me2.jpg"
                    width={900}
                    height={1100}
                    quality={100}
                    formats={['AUTO', 'WEBP', 'AVIF']}
                    alt="Headshot"
                  />
                </div>
              </StyledPic>

              <StyledPic className="round">
                <div className="wrapper">
                  <StaticImage
                    className="img"
                    src="../../images/cof-bagel.jpg"
                    width={900}
                    height={1100}
                    quality={100}
                    formats={['AUTO', 'WEBP', 'AVIF']}
                    alt="Headshot"
                  />
                </div>
              </StyledPic>

              <StyledPic className="round">
                <div className="wrapper">
                  <StaticImage
                    className="img"
                    src="../../images/me.jpg"
                    width={900}
                    height={1100}
                    quality={100}
                    formats={['AUTO', 'WEBP', 'AVIF']}
                    alt="Headshot"
                  />
                </div>
              </StyledPic>
            </div>

            <p className="sub-title">Some certificates that I have obtained:</p>
            <ul className="skills-list">
              {certificates &&
                certificates.map((certificate, i) =>
                  certificate.link ? (
                    <li key={i}>
                      <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                        {certificate.name}
                      </a>
                    </li>
                  ) : (
                    <li key={i}>{certificate.name}</li>
                  ),
                )}
            </ul>

            <p className="sub-text">
              Outside of coding and studying, I enjoy exploring new hobbies like baking (especially
              gluten-free and vegan recipes!), cooking creative meals, practicing pilates and yoga,
              building puzzles, and hunting for great coffee spots. I enjoy trying new things and
              working on hands-on projects to better understand the world around me.
              <br />
              <br />
              I’m also an amateur pianist (7+ years), and during the pandemic, I finally started
              practicing a bit more. Never recorded myself before, but here’s a{' '}
              <strong>VERY</strong> short clip if you're curious:{' '}
              <a
                href="https://www.dropbox.com/scl/fo/6roci218ikv8ylquywxs1/AHcTTAU8YXtEhlkEDJ76HDs?rlkey=yiub1l825pndthv0ixe83ozg4&st=y2fbuqi7&dl=0"
                target="_blank"
                rel="noopener noreferrer">
                <u>Dropbox link</u>
              </a>
              .
            </p>

            <StyledPic className="large">
              <div className="wrapper">
                <StaticImage
                  className="img"
                  src="../../images/piano.JPEG"
                  width={1800}
                  height={1100}
                  quality={100}
                  formats={['AUTO', 'WEBP', 'AVIF']}
                  alt="Headshot"
                />
              </div>
            </StyledPic>
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
