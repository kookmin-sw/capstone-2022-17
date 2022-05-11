import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #444444;
`;

const Title = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
