// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledAboutSection = styled.section`
//   max-width: 900px;

//   .inner {
//     display: flex;
//     font-size: var(--fz-xxl);

//     @media (max-width: 768px) {
//       display: block;
//     }
//   }
// `;
// const StyledText = styled.div`
//   width: 100%;
//   sub-title {
//     text-align: center;
//     font-size: var(--fz-lg);
//     margin: 20px 0;
//     color: var(--green);
//   }
//   ul.courses-list,
//   ul.skills-list {
//     display: grid;
//     grid-template-columns: repeat(3, minmax(140px, 200px));
//     grid-gap: 0 10px;
//     padding: 0;
//     margin: 20px 0 0 0;
//     overflow: hidden;
//     list-style: none;

//     li {
//       position: relative;
//       margin-bottom: 10px;
//       padding-left: 20px;
//       font-family: var(--font-mono);
//       font-size: var(--fz-xs);
//       transition: color 0.3s;

//       &:before {
//         content: '▹';
//         position: absolute;
//         left: 0;
//         color: var(--green);
//         font-size: var(--fz-sm);
//         line-height: 12px;
//       }

//       &:hover {
//         color: var(--green);
//       }
//     }
//   }

//   ul.courses-list {
//     grid-template-columns: repeat(2, minmax(140px, 400px));
//     grid-gap: 0 20px;
//   }
// `;

// const About = () => {
//   const revealContainer = useRef(null);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }

//     sr.reveal(revealContainer.current, srConfig());
//   }, []);

//   const skills = [
//     'Java',
//     'Javascript',
//     'React',
//     'Node.js',
//     'Python',
//     'SQL',
//     'Next.js',
//     'Typescript',
//   ];

//   const courses = [
//     'Data Structures and Algorithms',
//     'Computer Networks',
//     'Database Systems and Management',
//     '2023 Web Development Bootcamp',
//     'Machine Learning Specialization',
//     'Forage - Cognizant Artificial Intelligence Simulation',
//     'Forage - Goldman Sachs Software Engineering Simulation',
//     'Forage - JPMorgan Software Engineering Simulation',
//   ];

//   return (
//     <StyledAboutSection id="about" ref={revealContainer}>
//       <h2 className="numbered-heading">About me</h2>

//       <div className="inner">
//         <StyledText>
//           <div>
//             <p>
//               Hi! I'm Udval. I'm a computer science student with a math minor at Dickinson College.
//               I am primarly interested in software engineering/development and machine learning. I
//               am currently learning about - Machine Learning Specialization, on Coursera.
//               Furthermore, I am enrolled on Dialpad's program Dialership, an exclusive summer
//               program with various weekly virtual sessions and workshops.
//             </p>

//             <p className="sub-title">Some technologies I am associated with:</p>
//             <ul className="skills-list">
//               {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
//             </ul>

//             <p>
//               Outside of work and studying, I enjoy baking, and finding good coffee. I'm also
//               interested in learning new tech skills and apply them in practice.
//             </p>

//             <p className="sub-title">Relevant courseworks and certifications:</p>
//             <ul className="courses-list">
//               {courses && courses.map((skill, i) => <li key={i}>{skill}</li>)}
//             </ul>
//           </div>
//         </StyledText>
//       </div>
//     </StyledAboutSection>
//   );
// };

// export default About;

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
              Hi! I'm Udval, a computer science student with a minor in math at Dickinson College. I
              love building things, solving problems, and figuring out how technology works in the
              real world. Right now, I’m working on two projects—a full-stack Pomodoro app with API
              integration and an image classification model using machine learning in Python (as
              part of my AI Programming with Python Nanodegree). <br />
              To gain deeper insights into data analysis, I’m currently taking the{' '}
              <u>Data Analysis with Power BI course on Coursera</u> and have applied my skills in
              projects like <u>Stock Prediction</u>, where I leveraged machine learning models to
              analyze trends and forecast outcomes. I’ve also developed a strong interest in
              cybersecurity and am currently enrolled in the{' '}
              <u>Intermediate Cybersecurity course by CodePath</u>.
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
              I’m also an amateur pianist (10+ years), and during the pandemic, I finally started
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

            {/* 
            <p className="sub-text">
              Outside of coding and studying, I enjoy exploring new hobbies like baking (especially
              gluten-free and vegan recipes!), cooking creative meals, practicing pilates and yoga,
              and hunting for great coffee spots. I enjoy trying new things and working on hands-on
              projects to better understand the world around me. 
            </p> */}
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
