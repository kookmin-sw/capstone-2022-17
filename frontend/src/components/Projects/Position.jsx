import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.6rem;
`;

const Position = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Position;
