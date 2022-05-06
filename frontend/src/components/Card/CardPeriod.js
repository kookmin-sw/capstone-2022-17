import React from 'react';
import styled from 'styled-components';

const ProjectPeriod = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: #a0a0a0;
`;

// 모집날짜
const CardPeriod = ({ children }) => {
  return <ProjectPeriod> {children} </ProjectPeriod>;
};

export default CardPeriod;
