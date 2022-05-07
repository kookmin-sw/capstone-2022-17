import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: #000000;
`;

// 항목 이름
const Contents = ({ children }) => {
  return <Content>{children}</Content>;
};

export default Contents;
