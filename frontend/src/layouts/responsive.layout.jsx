import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'components/Nav/Nav';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    </MainContainer>
  );
};
export default ResponsiveLayout;
