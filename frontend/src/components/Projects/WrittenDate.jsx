import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.4rem;
  color: #dadada;
`;

const WrittenDate = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WrittenDate;
