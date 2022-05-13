import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.6rem;
  font-family: 'Pr-Regular';
  color: #adadad;

  display: flex;
`;

// 현재모집인원/총인원수 보여줌
const Card = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Card;
