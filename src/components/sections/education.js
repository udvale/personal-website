import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
// import codepathPDF from './certifications/TIP102.pdf';

const StyledAboutSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;

  .inner {
    display: flex;
    font-size: var(--fz-xxl);

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  width: 100%;

  .sub-title {
    font-size: var(--fz-xxl);
    text-decoration: underline;
    color: var(--green);
    margin: 20px 0;
  }

  .education-details {
    .college {
      color: var(--green);
      margin-bottom: 5px;
    }

    .college-2 {
      color: var(--green-tint);
    }

    .graduation {
      font-size: 14px;
      margin-top: 5px;
    }
  }

  .sub-text {
    margin: 30px 0 30px 0;
  }

  ul.courses-list {
    display: grid;
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: 15px;
      color: var(--light-green);
      transition: color 0.3s;

      &:before {
        content: '○';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }

      &:hover {
        color: var(--green-tint);
      }
    }
  }
`;

const Education = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const courses = [
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'Computer Networks',
    'Database Systems and Data Management',
    'Discreate Mathematics',
    'Linear Algebra',
    'Computational Mathematics',
    'Open Source Software/Web Development ',
    'Agile and Scrum Development',
    'Machine Learning Specialization /in progress/',
  ];

  const certificates = [
    {
      name: '2023 Web Development Bootcamp',
      link: 'https://www.udemy.com/certificate/UC-4c6aeb98-8559-48e3-ba3d-3cd6fbf93be9/',
    },
    {
      name: 'IBM - Introduction to Project Management',
      link: 'https://www.coursera.org/account/accomplishments/certificate/8TPXBDKGQWAU',
    },
    {
      name: 'Forage - Cognizant Artificial Intelligence Simulation',
      link:
        'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Cognizant/5N2ygyhzMWjKQmgCK_Cognizant_A8Ye9jvhe2GdBy9y3_1718762487158_completion_certificate.pdf',
    },
    {
      name: 'Forage - Goldman Sachs Software Engineering Simulation',
      link:
        'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_A8Ye9jvhe2GdBy9y3_1717220354202_completion_certificate.pdf',
    },
    {
      name: 'Forage - JPMorgan Software Engineering Simulation',
      link:
        'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_A8Ye9jvhe2GdBy9y3_1702748189482_completion_certificate.pdf',
    },
    {
      name: 'CodePath Intermediate Technical Interview Prep',
      link: 'https://drive.google.com/file/d/1Sjou7FeTqTCLadWh2gOUzE2bV7Pj7GkI/preview',
    },
    {
      name: 'Dialpad - Dialership 2024 program',
      link: 'https://drive.google.com/file/d/1h3XE9eaqjiPaFtt0zhrOJ5vvCYv0lY_5/preview',
    },
  ];

  return (
    <StyledAboutSection id="education" ref={revealContainer}>
      <h2 className="numbered-heading">education</h2>

      <div className="inner">
        <StyledText>
          <div>
            <div className="education-details">
              <p className="college">
                B.S Computer Science - <span className="college-2">Dickinson College</span>
              </p>
              <p className="graduation">Expected Graduation: May 2025</p>
            </div>
            <p className="sub-title">Relevant Courseworks:</p>
            <ul className="courses-list">
              {courses && courses.map((course, i) => <li key={i}>{course}</li>)}
            </ul>
            <p className="sub-title">Certificates: </p>
            <ul className="courses-list">
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
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default Education;
