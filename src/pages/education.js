import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Education } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const EducationPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Education />
    </StyledMainContainer>
  </Layout>
);

EducationPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EducationPage;
