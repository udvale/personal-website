import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Project data
const projectsData = [
  {
    title: 'ZenBugetbee',
    description:
      'A full-stack application for tracking expenses and budgeting, with user authentication for personalized financial management.',
    skills: ['Next.js', 'React', 'PostgreSQL'],
    github: 'https://github.com/udvale/Expense-Tracker',
    website: 'https://budget-bee-manager.vercel.app/',
  },
  {
    title: 'Image Classification',
    description:
      'A CNN-based image classifier using PyTorch to distinguish 102 flower species, applying transfer learning and training on the Oxford 102 Flower dataset.',
    skills: ['Python', 'PyTorch', 'VGG16'],
    github: 'https://github.com/udvale/image-classification-udacity',
  },
  {
    title: 'Stock Prediction with ML',
    description:
      'A machine learning project that predicts Google Stock Prices by comparing two popular methods: Linear Regression and Long Short-Term Memory (LSTM).',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Yahoo Finance API'],
    github: 'https://github.com/udvale/Stock_Prediction',
    website:
      'https://medium.com/@udvle/predicting-google-stock-prices-with-machine-learning-73b34fc7407a',
  },
  {
    title: 'Flutter Calander',
    description:
      'A cross-platform calendar app built with Flutter, similar to Google Calendar, for managing appointments.',
    skills: ['Flutter', 'FastAPI', 'MySQL'],
    github: 'https://github.com/udvale/flutter_calendar',
  },
  // {
  //   title: 'Pomo-AI with Spotify',
  //   description:
  //     'A customizable Pomodoro timer integrated with Spotify for syncing playlists and improving productivity.',
  //   skills: ['Typescript', 'Google Gemini API', 'Spotify API'],
  //   github: 'https://github.com/udvale/Pomodoro-App',
  // },
  {
    title: 'Task Manager',
    description:
      'A lightweight task management tool, available both as a web application and as a Google Chrome extension.',
    skills: ['HTML', 'CSS', 'Javascript'],
    github: 'https://github.com/udvale/Task-Manage',
    website:
      'https://chromewebstore.google.com/detail/task-manager/dadckocfilhmalhhcafdghhoeahnfhaf?authuser=0&hl=en&pli=1',
  },
  {
    title: 'Task Reminder Bot',
    description:
      'A simple Telegram bot to help you manage your daily tasks by sending reminders at specified intervals. ',
    skills: ['Node.js', 'Telegram Bot API'],
    github: 'https://github.com/udvale/reminder-bot',
  },
  {
    title: 'Multiplayer Hangman Game',
    description:
      'An interactive hangman game built with Java, featuring real-time multiplayer capabilities using TCP/IP protocol and multi-threading.',
    skills: ['Java', 'TCP/IP'],
    github: 'https://github.com/udvale/Hangman-Game',
  },
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio website built using React.js and CSS, showcasing my skills and projects.',
    skills: ['React', 'CSS'],
    github: 'https://github.com/udvale/personal-website',
  },
  {
    title: 'Web Scraping Analysis',
    description:
      'A data analysis project that scrapes job postings from Indeed.com to extract insights into the computer science job market.',
    skills: ['Selenium', 'Python', 'Jupyter Notebook'],
    github: 'https://github.com/udvale/Web-Scraping-Project',
  },
];

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1050px;
  margin: 0 auto;

  .projects-heading {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    font-size: clamp(24px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before,
    &:after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      position: relative;
    }

    &:before {
      margin-right: 20px;
    }

    &:after {
      margin-left: 20px;
    }
  }

  .projects-grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    margin-top: 20px;
    padding: 0;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    grid-auto-rows: minmax(300px, auto);
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--slight-green);
    transition: var(--transition);
    overflow: auto;
    color: var(--green);

    .project-top {
      ${({ theme }) => theme.mixins.flexBetween};
      margin-bottom: 35px;

      .folder {
        color: var(--green);
        svg {
          width: 45px;
          height: 35px;
        }
      }

      .project-links {
        display: flex;
        align-items: center;
        margin-right: -10px;
        color: var(--green);

        a {
          ${({ theme }) => theme.mixins.flexCenter};
          padding: 5px 7px;

          &.external {
            svg {
              width: 22px;
              height: 22px;
              margin-top: -4px;
            }
          }

          svg {
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .project-title {
      margin: 0 0 10px;
      color: var(--green);
      font-size: var(--fz-xxl);
    }

    .project-description {
      color: var(--green);
      font-size: 17px;

      a {
        ${({ theme }) => theme.mixins.inlineLink};
      }
    }

    .project-tech-list {
      display: flex;
      align-items: flex-end;
      flex-grow: 1;
      flex-wrap: wrap;
      padding: 0;
      margin: 20px 0 0 0;
      list-style: none;

      li {
        font-family: var(--font-mono);
        font-size: var(--fz-xxs);
        line-height: 1.75;
        color: var(--green);

        &:not(:last-of-type) {
          margin-right: 15px;
        }
      }
    }
  }
`;

const Projects = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const projectInner = project => {
    const { title, skills, github, description, website } = project;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {website && (
                <a href={website} aria-label="External Link" target="_blank" rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">{title}</h3>

          <div className="project-description">
            <p>{description}</p>
          </div>
        </header>

        <footer>
          {skills && (
            <ul className="project-tech-list">
              {skills.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 className="numbered-heading" ref={revealTitle} id="projects">
        pet projects
      </h2>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projects &&
              projects.map((project, i) => (
                <StyledProject key={i}>{projectInner(project)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projects &&
              projects.map((project, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={i * 300} exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i * 150}ms`,
                    }}
                  >
                    {projectInner(project)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
    </StyledProjectsSection>
  );
};
export default Projects;

