import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Projects } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const ProjectsPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Projects />
    </StyledMainContainer>
  </Layout>
);

ProjectsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ProjectsPage;
