import React from 'react';
import styled from 'styled-components';
import MiniAvatar from 'components/common/MiniAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: #555555;
`;

const Leader = ({ children }) => {
  return (
    <Container>
      <MiniAvatar />
      {children}
    </Container>
  );
};

export default Leader;
