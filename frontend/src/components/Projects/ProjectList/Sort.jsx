import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.8rem;
  color: #888888;
  padding: 0.3rem 0.7rem;
  border: 1px solid #888888;
  border-radius: 0.1rem;
  cursor: pointer;
`;

const Sort = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Sort;
