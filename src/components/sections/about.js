import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

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
    color: var(--green);
    margin: 20px 0;
  }

  .sub-text {
    margin: 30px 0 30px 0;
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
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
        font-size: var(--fz-xs);
        line-height: 12px;
      }

      &:hover {
        color: var(--green-tint);
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

  const skills = ['Java', 'Javascript', 'React', 'Node.js', 'Python', 'SQL', 'MATLAB', 'C'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">about me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              <p>
                Hi! I'm Udval, a recent Dickinson College graduate with a degree in computer
                science.
                <br />
                I love building things, solving problems, and exploring how technology shapes the
                real world. I'm currently pursuing CompTIA A+ certification to deepen my skills in
                cybersecurity, while also expanding my expertise in software development, data
                analysis, and machine learning.
                <br />
                I'm always eager to collaborate, learn from others, and take on new challenges.
                Right now, I'm taking the <u>Data Analysis with Power BI course on Coursera</u> and
                applying these skills to projects like <u>Stock Prediction</u>, where I use machine
                learning models to analyze trends and forecast outcomes.
              </p>
            </p>

            <p className="sub-title">Some technologies I am associated with:</p>
            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <p className="sub-text">
              Outside of coding and studying, I enjoy exploring new hobbies like baking (especially
              gluten-free and vegan recipes!), cooking creative meals, practicing pilates and yoga,
              and hunting for great coffee spots. I enjoy trying new things and working on hands-on
              projects to better understand the world around me. <br />
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
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
