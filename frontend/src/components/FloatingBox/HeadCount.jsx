import React from 'react';
import styled from 'styled-components';

const Headcount = styled.div`
  font-size: 0.9rem;
  font-family: 'Pr-Regular';
  color: #adadad;

  display: flex;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

// 현재모집인원/총인원수 보여줌
const HeadCount = ({ children }) => {
  return <Headcount>{children}</Headcount>;
};
export default HeadCount;
