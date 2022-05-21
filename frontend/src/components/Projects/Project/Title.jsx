import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  font-family: 'Pr-Regular';
  color: #444444;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Title = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
