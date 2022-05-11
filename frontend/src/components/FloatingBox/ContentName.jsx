import React from 'react';
import styled from 'styled-components';

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  font-weight: bold;
  color: #444444;
`;

// 항목 이름
const ContentName = ({ children }) => {
  return <Name>{children}</Name>;
};

export default ContentName;
