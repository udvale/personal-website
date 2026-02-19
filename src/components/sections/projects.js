import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import nlpToolImg from '../../images/projects/nlp-tool.png';
import nlpToolImg2 from '../../images/projects/nlpImg2.png';
import zenBudgetImg from '../../images/projects/budgetbee.png';
import imageClassificationImg from '../../images/projects/image-classification.png';
import stockPredictionImg from '../../images/projects/stock-prediction.png';
import flutterCalanderImg from '../../images/projects/flutter-calander.png';
import taskManagerImg from '../../images/projects/task-manager.png';
import webScraperImg from '../../images/projects/web-scraping.png';
import netflixImg from '../../images/projects/netflix-analysis.png';
import hangmanImg from '../../images/projects/hangman.png';
// import lexBotImg from '../../images/projects/lexbot.png';
import taskBotImg from '../../images/projects/taskbot.png';
import pandOsImg from '../../images/projects/pandos.png';
import personalWebsiteImg from '../../images/projects/personal-website.png';
import lexBot1Img from '../../images/projects/botchat1.png';
import lexBot2Img from '../../images/projects/botchat2.png';

const webProjects = [
  {
    title: 'Personal Website',
    description:
      // 'My personal website built using React and Tailwind CSS, showcasing my projects and skills.',
      "Built my personal website using React and Tailwind CSS, using Brittany Chiang's website as reference. Deployed on Vercel, showcases my projects, skills and my interests at the moment.",
    skills: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/udvale/personal-website',
    website: 'https://udvale.vercel.app/',
    image: personalWebsiteImg,
  },
  {
    title: 'NLP Component Suggestion Tool',
    description:
      'Built this during my internship to help developers find the right design system components using natural language. Uses OpenAI for smart matching with regex as a fallback.',
    skills: ['Next.js', 'TypeScript', 'Python', 'OpenAI API'],
    github: 'https://github.com/udvale/VPDS-Suggestion-Tool',
    website: 'https://vpds-suggestion-tool.vercel.app/',
    image: [nlpToolImg, nlpToolImg2],
  },
  {
    title: 'ZenBugetbee',
    description:
      'An expense tracker application for tracking expenses and budgeting, with user authentication for personalized financial management.\n\n Built during MLH Global Hacking Week after learning Next.js and this is my first full stack project. ',
    skills: ['Next.js', 'React', 'PostgreSQL'],
    github: 'https://github.com/udvale/Expense-Tracker',
    website: 'https://budget-bee-manager.vercel.app/',
    image: zenBudgetImg,
  },
  {
    title: 'Flutter Calander',
    description:
      'A calendar app mimicking Google Calendar, built with Flutter, for managing appointments/booking for internal use for a company employees.',
    skills: ['Flutter', 'FastAPI', 'MySQL'],
    github: 'https://github.com/udvale/flutter_calendar',
    image: flutterCalanderImg,
  },
  {
    title: 'Task Manager',
    description:
      'Task management tool, available both as a web application and as a Google Chrome extension.\n\n I wanted a digital to-do list that can be easily accessed thus I built the tool and also added as an extension for everyday usage.',
    skills: ['HTML', 'CSS', 'Javascript'],
    github: 'https://github.com/udvale/Task-Manage',
    website:
      'https://chromewebstore.google.com/detail/task-manager/dadckocfilhmalhhcafdghhoeahnfhaf?authuser=0&hl=en&pli=1',
    image: taskManagerImg,
  },
];

// Machine Learning Projects
const mlProjects = [
  {
    title: 'Image Classification',
    description:
      'A CNN-based image classifier using PyTorch to distinguish 102 flower species, applying transfer learning and training on the Oxford 102 Flower dataset. Built as part of my Udacity AI Programming Nanodegree.',
    skills: ['Python', 'PyTorch', 'VGG16'],
    github: 'https://github.com/udvale/image-classification-udacity',
    image: imageClassificationImg,
  },
  {
    title: 'Stock Prediction with ML',
    description:
      'This is my first machine learning project that predicts Google Stock Prices by comparing two popular methods: Linear Regression and Long Short-Term Memory (LSTM).\n\nAlso, I published my understanding and the results on Medium to share my learning journey.',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Yahoo Finance API'],
    github: 'https://github.com/udvale/Stock_Prediction',
    website:
      'https://medium.com/@udvle/predicting-google-stock-prices-with-machine-learning-73b34fc7407a',
    image: stockPredictionImg,
  },
];

// Data Analysis Projects
const dataProjects = [
  {
    title: 'Web Scraping Analysis',
    description:
      'A data analysis project that scrapes job postings from Indeed.com to extract insights into the computer science job market.',
    skills: ['Selenium', 'Python', 'Jupyter Notebook'],
    github: 'https://github.com/udvale/Web-Scraping-Project',
    image: webScraperImg,
  },
  {
    title: 'Netflix Content Analysis',
    description:
      'A data analysis project that analyzes Netflix titles to identfy trends in genre performance, country output, and shifts in content strategy.\n\n Built this project to practice my data analysis skills as well as to learn how to use Tableau. ',
    skills: ['Python', 'SQL', 'Tableau', 'PostgreSQL'],
    github: 'https://github.com/udvale/netflix-content-analysis',
    image: netflixImg,
  },
];

// Other Projects
const otherProjects = [
  {
    title: 'PandOS - OS Development Simulation',
    description:
      'A custom OS simulator built on the μMPS3 emulator with round-robin scheduling, deadlock detection, and interrupt handling for multitasking across multiple user processes.\n\n This project was part of my Operating Systems course, and I built it to gain hands-on experience with OS concepts and low-level programming.',
    skills: ['C', 'μMPS'],
    github: 'https://gitfront.io/r/udvale/fakZ4B8NEUod/PandOS/',
    image: pandOsImg,
  },
  {
    title: 'Task Reminder Bot',
    description:
      'Built during MLH Global Hacking Week. A Telegram bot that manages daily tasks by sending reminders at specified intervals.',
    skills: ['Node.js', 'Telegram Bot API'],
    github: 'https://github.com/udvale/reminder-bot',
    image: taskBotImg,
  },
  {
    title: 'Multiplayer Hangman Game',
    description:
      'An interactive hangman game built with Java for my Computer Networks course, featuring real-time multiplayer capabilities using TCP/IP protocol and multi-threading.\n\nI built it to apply my understanding of network programming and concurrency in a fun and engaging way.',
    skills: ['Java', 'TCP/IP'],
    github: 'https://github.com/udvale/Hangman-Game',
    image: hangmanImg,
  },
  {
    title: 'Amazon Lex BankerBot',
    description:
      'I wanted to create an extension for my full-stack expense tracker that uses a bot. At the same time, I was learning more on AWS thus I built a conversational banking chatbot using AWS Lex, enabling users to check balances, view recent transactions, and transfer funds through natural language interactions.\n\n Planning to integrate this with my expense tracker app in the future.',
    skills: ['AWS Lex', 'AWS CloudFormation', 'AWS Lambda', 'IAM'],
    github: 'https://github.com/udvale/banker-bot',
    image: [lexBot1Img, lexBot2Img],
  },
];

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  a {
    position: relative;
    z-index: 1;
  }
`;

const ZoomStyles = createGlobalStyle`
  [data-rmiz-modal-overlay] {
    background-color: var(--dark-green) !important;
    opacity: 0.95 !important;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--green) !important;
    width: 30px !important;
    height: 28px !important;
  }
  
  .swiper-pagination-bullet {
    background: var(--green) !important;
    opacity: 0.5;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1 !important;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: left;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 20px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-description {
      @media (min-width: 769px) {
        margin-left: 0;
        margin-right: -20px;
      }
    }

    .project-title {
      @media (min-width: 768px) {
        margin-left: 20px;
      }
    }

    .project-tech-list {
      justify-content: flex-start;

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-start;
      margin-left: 10px;
      margin-right: -10px;

      @media (max-width: 768px) {
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 7;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      grid-row: 1; /* put content above image on small screens */
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 25px 16px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      grid-column: 1 / -1;
      height: auto;
      opacity: 0.95;
      grid-row: 2;
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 12;
    padding: 20px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (min-width: 769px) {
      margin-left: -20px;
    }
    text-align: left;

    @media (max-width: 480px) {
      padding: 10px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 7 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: auto;
      opacity: 0.95;
      grid-row: 2;
    }

    @media (max-width: 992px) {
      grid-column: 1 / -1;
      height: auto;
      opacity: 0.95;
      grid-row: 2;
    }

    &.multiple {
      .swiper {
        border-radius: var(--border-radius);
        overflow: hidden;
      }

      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .img {
      border-radius: var(--border-radius);
      border: var(--green-tint) 2px solid;
      mix-blend-mode: multiply;
      width: 100%;
      height: auto;
      cursor: pointer;

      @media (max-width: 768px) {
        object-fit: cover;
        width: 100%;
        height: auto;
        max-width: 720px;
        margin: 0 auto;
        cursor: default;
      }
    }
  }
`;

const ProjectSection = ({ title, projects, prefersReducedMotion }) => {
  const revealProjects = useRef([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      <ZoomStyles />
      <h2 className="numbered-heading">{title}</h2>
      <StyledProjectsGrid>
        {prefersReducedMotion ? (
          <>
            {projects &&
              projects.map((project, i) => {
                const { website, title, skills, github, description, image } = project;

                return (
                  <StyledProject key={i}>
                    <div className="project-content">
                      <div>
                        <h3 className="project-title">
                          <a href={website || github}>{title}</a>
                        </h3>

                        <div className="project-description">
                          {description.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>

                        {skills.length && (
                          <ul className="project-tech-list">
                            {skills.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </ul>
                        )}

                        <div className="project-links">
                          {github && (
                            <a
                              href={github}
                              aria-label="GitHub Link"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {website && (
                            <a
                              href={website}
                              aria-label="External Link"
                              className="external"
                              target="_blank"
                              rel="noreferrer">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`project-image ${Array.isArray(image) ? 'multiple' : ''}`}>
                      {Array.isArray(image) ? (
                        <Swiper
                          modules={[Navigation, Pagination]}
                          navigation
                          pagination={{ clickable: true }}
                          loop={true}
                          spaceBetween={0}
                          slidesPerView={1}>
                          {image.map((imgSrc, idx) => (
                            <SwiperSlide key={idx}>
                              <Zoom>
                                <img src={imgSrc} alt={`${title} ${idx + 1}`} className="img" />
                              </Zoom>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <Zoom>
                          <img src={image} alt={title} className="img" />
                        </Zoom>
                      )}
                    </div>
                  </StyledProject>
                );
              })}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projects &&
              projects.map((project, i) => {
                const { website, title, skills, github, description, image } = project;

                return (
                  <CSSTransition key={i} classNames="fadeup" timeout={i * 300} exit={false}>
                    <StyledProject
                      ref={el => (revealProjects.current[i] = el)}
                      style={{
                        transitionDelay: `${i * 100}ms`,
                      }}>
                      <div className="project-content">
                        <div>
                          <h3 className="project-title">
                            <a href={website || github}>{title}</a>
                          </h3>

                          <div className="project-description">
                            {description.split('\n').map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>

                          {skills.length && (
                            <ul className="project-tech-list">
                              {skills.map((tech, i) => (
                                <li key={i}>{tech}</li>
                              ))}
                            </ul>
                          )}

                          <div className="project-links">
                            {github && (
                              <a
                                href={github}
                                aria-label="GitHub Link"
                                target="_blank"
                                rel="noreferrer">
                                <Icon name="GitHub" />
                              </a>
                            )}
                            {website && (
                              <a
                                href={website}
                                aria-label="External Link"
                                className="external"
                                target="_blank"
                                rel="noreferrer">
                                <Icon name="External" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={`project-image ${Array.isArray(image) ? 'multiple' : ''}`}>
                        {Array.isArray(image) ? (
                          <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}>
                            {image.map((imgSrc, idx) => (
                              <SwiperSlide key={idx}>
                                <Zoom>
                                  <img src={imgSrc} alt={`${title} ${idx + 1}`} className="img" />
                                </Zoom>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        ) : (
                          <Zoom>
                            <img src={image} alt={title} className="img" />
                          </Zoom>
                        )}
                      </div>
                    </StyledProject>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        )}
      </StyledProjectsGrid>
    </>
  );
};

const Projects = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="projects">
      <div style={{ paddingTop: '50px' }}>
        <ProjectSection
          title="Web & Full Stack Projects"
          projects={webProjects}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <div style={{ marginTop: '200px' }}>
        <ProjectSection
          title="Machine Learning Projects"
          projects={mlProjects}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <div style={{ marginTop: '200px' }}>
        <ProjectSection
          title="Data Analysis Projects"
          projects={dataProjects}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <div style={{ marginTop: '200px' }}>
        <ProjectSection
          title="Other Projects"
          projects={otherProjects}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
};

export default Projects;