import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.9rem;
  font-family: 'Pr-Regular';
  color: #888888;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const Position = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Position;
