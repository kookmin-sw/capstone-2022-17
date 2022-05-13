import React from 'react';
import styled from 'styled-components';

const HeadCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  font-family: 'Pr-Regular';
  color: #adadad;

  display: flex;
`;

// 현재모집인원/총인원수 보여줌
const CardHeadCount = ({ children }) => {
  return <HeadCount>{children}</HeadCount>;
};
export default CardHeadCount;
