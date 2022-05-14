import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1rem;
  font-family: 'Pr-Medium';
  color: #000000;
  cursor: pointer;

  &::focus {
    color: #4596ff;
  }

  &:hover {
    color: #4596ff;
  }
`;

const Menu = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Menu;
