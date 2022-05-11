import React from 'react';
import styled from 'styled-components';

const HeadCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: black;
  display: flex;
`;

// 현재모집인원/총인원수 보여줌
const CardHeadCount = ({ nowCount, total }) => {
  return (
    <HeadCount>
      {nowCount}/{total}
    </HeadCount>
  );
};
export default CardHeadCount;
