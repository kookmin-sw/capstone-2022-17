import React from 'react';
import styled from 'styled-components';

const HeadCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.color.primary};
  display: flex;
`;

const HeadCountImg = styled.img`
  width: 100%;
`;

// 현재모집인원/총인원수 보여줌
const CardHeadCount = ({ nowCount, total }) => {
  return (
    <HeadCount>
      <HeadCountImg src="card/headCountImg.png" />
      {nowCount}/{total}
    </HeadCount>
  );
};
export default CardHeadCount;
