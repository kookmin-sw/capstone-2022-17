import React from 'react';
import styled from 'styled-components';
import Nav from 'components/Nav/Nav';

const MainContainer = styled.div`
  width: 100%;
`;

const ResponsiveLayout = ({ children }) => {
  return (
    <MainContainer>
      <Nav />
      {children}
    </MainContainer>
  );
};
export default ResponsiveLayout;
