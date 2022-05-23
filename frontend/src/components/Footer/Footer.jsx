import React from 'react';
import styled from 'styled-components';
import * as Container from 'components/common/Containers';
import TermsModal from 'components/Terms/TermsModal';
import ServiceModal from 'components/Terms/ServiceModal';
import COLOR from 'constant/color';
import FooterLogo from './FooterLogo';

const FooterContainer = styled(Container.ColumnMiddleContainer)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #f6f6f6;
`;

const FooterContent = styled(Container.RowBetweenContainer)`
  padding: 4rem 3rem 2rem 3rem;
  width: 100%;
  max-width: 1200px;
`;

const Copyright = styled(Container.RowEndContainer)`
  padding: 0rem 3rem 5rem 3rem;
  width: 100%;
  max-width: 1200px;
  flex-direction: row-reverse;
  color: ${COLOR.LIGHTGRAY};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo />
        <Container.RowStartContainer>
          <TermsModal />
          <div style={{ marginRight: '2rem' }} />
          <ServiceModal />
        </Container.RowStartContainer>
      </FooterContent>
      <Copyright>Copyright 2022. TEAMING. all rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
