import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const LikesNum = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: black;
  display: flex;
  margin: 0 0.3rem;
  color: #adadad;
`;

// 좋아요
const Likes = ({ children }) => {
  return (
    <LikesNum>
      <Icon name="heart outline" /> {children}
    </LikesNum>
  );
};

export default Likes;
