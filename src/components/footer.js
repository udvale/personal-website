import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 10px;
  text-align: center;
  background-color: var(--slight-green);
`;

const StyledSocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 270px;
  margin: 0 auto 3px;
  color: var(--green-tint);

  ul {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;

      a {
        padding: 0 8px;

        svg {
          width: 18px;
          height: 18px;
        }
      }

      &:not(:last-child)::after {
        content: '•';
        margin: 0 5px;
        color: var(--green-tint);
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--green-tint);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  a {
    padding: 0 10px;
  }

  .second-text {
    font-size: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .emblem {
    font-size: 13px;
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
      </ul>
    </StyledSocialLinks>

    <StyledCredit tabIndex="-1">
      <div>
        <span>Designed &amp; Coded by Udvale</span>
      </div>
      <div className="second-text">
          All Rights Reserved<span className="emblem">©</span>
      </div>
    </StyledCredit>
  </StyledFooter>
);

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
