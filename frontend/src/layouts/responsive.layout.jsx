import React from 'react';
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
  margin-top: 7rem;
`;

const ResponsiveLayout = ({ children }) => {
  return (
    <MainContainer>
      <Nav />
      <ContentContainer>{children}</ContentContainer>
    </MainContainer>
  );
};
export default ResponsiveLayout;
