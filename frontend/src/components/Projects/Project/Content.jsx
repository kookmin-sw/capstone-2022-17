import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1rem;
  line-height: 1.3rem;
`;

const Content = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;