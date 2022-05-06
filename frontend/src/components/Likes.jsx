import React from 'react';
import styled from 'styled-components';

const LikesNum = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.color.primary};
  display: flex;
`;

const LikesImg = styled.img`
  width: 100%;
`;

// 좋아요
const Likes = ({ children }) => {
  return (
    <LikesNum>
      <LikesImg /> {children}
    </LikesNum>
  );
};

export default Likes;
