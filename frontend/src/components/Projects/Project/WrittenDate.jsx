import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.7rem;
  font-family: 'Pr-ExtraLight';
  color: #cacaca;
  padding-left: 0.4rem;
`;

const WrittenDate = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WrittenDate;
