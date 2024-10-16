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

  const skills = [
    'Java',
    'Javascript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Next.js',
    'MATLAB',
    'Typescript',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">about me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm Udval, a computer science student with a minor in math at Dickinson College,
              deeply passionate about software engineering, development, and machine learning. I'm
              currently enhancing my skills through the{' '}
              <u>Machine Learning Specialization on Coursera</u>, and I've recently been sponsored
              by AWS to join the <u>AI Programming with Python Nanodegree</u>. I’m excited to
              continue exploring the intersection of innovation and technology.
            </p>

            <p className="sub-title">Some technologies I am associated with:</p>
            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <p className="sub-text">
              Outside of work and studying, I enjoy baking, doing pilates/yoga, and finding good
              coffee. I'm also interested in learning new tech skills and applying them in practice.
            </p>
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
