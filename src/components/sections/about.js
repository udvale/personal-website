import React, { act, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'video-react/dist/video-react.css';

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 140px 20px; /* add horizontal padding so content doesn't touch edges on small screens */
  box-sizing: border-box;

  .inner {
    display: flex;
    font-size: var(--fz-xxl);

    @media (max-width: 768px) {
      display: block;
      /* ensure inner blocks have breathing room on narrow viewports */
      padding: 0 6px;
    }
  }

  .profile-pic {
    display: flex;
    gap: 40px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    @media (max-width: 768px) {
      gap: 16px;
      flex-wrap: wrap;
    }
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

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: 24px;
    background-color: var(--green-tint);
    padding: 8px;

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
      border-radius: 16px;
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

      &:hover,
      &:focus {
        transform: none;

        &:after {
          transform: none;
        }
      }

      &:after {
        display: none;
      }
    }
  }
`;

const StyledPianoSwiper = styled.div`
  margin: 40px auto;
  max-width: 850px;

  .swiper {
    border-radius: 16px;
    border: 1px solid var(--green-tint);
    overflow: hidden;
    user-select: none;
  }

  .swiper-slide {
    height: 470px;
    background: var(--navy);
    overflow: hidden;
    z-index: 1;

    > div {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--green);

    &::after {
      font-size: 20px;
    }
  }

  .swiper-pagination-fraction {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    padding-bottom: 6px;
    z-index: 20;       
    pointer-events: none;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

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
              Hi, I'm Udval, a Software Engineer, focusing on fullstack development, specifically
              frontend work. I love building digital experiences, solving complex problems, and
              exploring how technology shapes the world we know today.
              <br />
              <br />
              Currently, I'm practicing Junior Cybersecurity skills through Hack the Box to deepen
              my capabilities in cybersecurity, while also expanding my expertise in UI development,
              data analysis, and machine learning.
              <br />
              <br />
              Based in Seattle, I'm always eager to collaborate with like-minded professionals,
              learn from each other, and take on new challenges.
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
              In my personal time, I enjoy exploring gluten-free and vegan recipes, cooking creative
              meals, practicing pilates and yoga, building puzzles, and hunting for great coffee
              spots. I enjoy trying new things and working on hands-on projects to better understand
              the world around me.
              <br />
              <br />
              I'm also an amateur pianist (7+ years) who started practicing more seriously during
              the pandemic. What began as casual playing turned into structured practice sessions,
              and I even started video recording myself for the first time. Scroll through the
              clips below to hear some of my practice sessions!
            </p>

            <StyledPianoSwiper>
              <Swiper
                pagination={{ type: 'fraction' }}
                navigation={true}
                loop={true}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                  setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                  }, 200); 
                }}
                modules={[Pagination, Navigation]}
                className="swiper">
                <SwiperSlide>
                  <StaticImage
                    src="../../images/piano.JPEG"
                    alt="Piano practice"
                    layout="fullWidth"
                    style={{ height: '100%' }}
                    imgStyle={{ objectFit: 'contain', height: '470px' }}
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/ddlrn1cvtaq629eqh2jer/victor-s-solo-bride-corpse.mp4?rlkey=lbveoz06tma4cu8qwv5zjdblt&st=0eoy1jom&raw=1"
                      playing={activeIndex === 1}
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Victor's Piano Solo - Corpse Bride
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/qef67f4x6h0t5ww70jmi6/clair-de-lune-claude-debussy.mp4?rlkey=cqw2hgbp9wx9yihijgcslp0jn&st=jyyj1et8&raw=1"
                      playing={activeIndex === 2} 
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Clair de Lune - Debussy
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/crwhc8uhbsp1exiialirx/moonlight-sonata-op.27-no.2-beethoven.mp4?rlkey=e96maj67jywvylnvoux7tbio4&st=866nawuj&raw=1"
                      playing={activeIndex === 3}
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Moonlight Sonata op.27 no.2 - Beethoven (1)
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/phsc0d6noyum4jaua7949/moonlight-sonata-op.27-no.2-beethoven-1.mp4?rlkey=4mjfbawcg0lg3g8tq6q8v5j9g&st=6sjvd0pv&raw=1"
                      playing={activeIndex === 4}
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Moonlight Sonata op.27 no.2 - Beethoven (2)
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/67ywzgln1q94wqkpzf4a5/waltz-op.69-1-chopin.mp4?rlkey=uepqk4lfxvdskdgv83svut0pl&st=o934zz9x&raw=1"
                      playing={activeIndex === 5}
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Waltz op.69-1 - Chopin
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div style={{ position: 'relative', width: '100%', height: '470px' }}>
                    <ReactPlayer
                      src="https://www.dropbox.com/scl/fi/pk5scg4zqijneaywtd84v/waltz-op64-2-chopin.mp4?rlkey=17rsiw95nud6x1taqs93lapvj&st=sscxk61d&raw=1"
                      playing={activeIndex === 6}
                      controls={true}
                      width="100%"
                      height="470px"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      left: '10px', 
                      color: 'var(--green)', 
                      fontSize: 'var(--fz-sm)',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 10,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                      Waltz op.64-2 - Chopin
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>
            </StyledPianoSwiper>
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
