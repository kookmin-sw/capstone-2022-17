import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1rem;
  font-family: 'Pr-Regular';
  color: #888888;
  cursor: pointer;
`;

const Menu = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Menu;
