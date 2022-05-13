import React from 'react';
import styled from 'styled-components';
import MiniAvatar from 'components/common/MiniAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;

  font-size: 0.7rem;
  font-family: 'Pr-Regular';
  color: #555555;
  cursor: pointer;
`;

const Leader = ({ children }) => {
  return (
    <Container>
      <MiniAvatar img="https://cdn.eyesmag.com/content/uploads/posts/2020/12/09/tesla-elon-musk-moves-to-texas-1-5b119051-2c23-449b-b554-7445558ebf62.jpg" />
      {children}
    </Container>
  );
};

export default Leader;
