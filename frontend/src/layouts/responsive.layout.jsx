import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'components/Nav/Nav';
import Footer from 'components/Footer/Footer';

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15rem;
`;

const ContentContainer = styled.div`
  margin-top: 6rem;
`;

const ResponsiveLayout = ({ children }) => {
  const location = useLocation();
  return (
    <MainContainer>
      {!location.pathname.includes('survey') && !location.pathname.includes('-position') && <Nav />}
      <ContentContainer
        style={
          location.pathname.includes('survey') || location.pathname.includes('-position')
            ? { marginTop: '0' }
            : null
        }
      >
        {children}
      </ContentContainer>
      {!location.pathname.includes('sign') &&
        !location.pathname.includes('survey') &&
        !location.pathname.includes('-position') && <Footer />}
    </MainContainer>
  );
};
export default ResponsiveLayout;
