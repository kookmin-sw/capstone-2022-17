import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const LikesNum = styled.div`
  font-size: 0.6rem;
  font-family: 'Pr-ExtraLight';
  color: #adadad;

  display: flex;
  margin: 0 0.3rem;
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