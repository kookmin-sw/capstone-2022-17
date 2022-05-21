import React from 'react';
import styled from 'styled-components';

const Name = styled.div`
  font-size: 0.8rem;
  color: #444444;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

// 항목 이름
const Period = ({ startDate, endDate }) => {
  return (
    <Name>
      {startDate}~{endDate}
    </Name>
  );
};

export default Period;
