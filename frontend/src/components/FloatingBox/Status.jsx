import React from 'react';
import styled from 'styled-components';

const State = styled.div`
  font-size: 1rem;
  color: #59cdda;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

// 항목 이름
const Status = ({ children }) => {
  return <State>{children}</State>;
};

export default Status;
