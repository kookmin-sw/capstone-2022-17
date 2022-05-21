import React from 'react';
import styled from 'styled-components';

const Name = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #444444;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

// 항목 이름
const Purpose = ({ children }) => {
  return <Name>{children}</Name>;
};

export default Purpose;
