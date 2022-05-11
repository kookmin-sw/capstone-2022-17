import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.6rem;
  font-family: 'Pr-Regular';
  color: #888888;
`;

const Position = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Position;
