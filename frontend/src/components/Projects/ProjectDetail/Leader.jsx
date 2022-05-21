import React from 'react';
import styled from 'styled-components';
import MiniAvatar from 'components/common/MiniAvatar';

const Container = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.1rem;
  font-family: 'Pr-Regular';
  color: #555555;
  cursor: pointer;
`;

const Leader = ({ leaderNickName, userId }) => {
  return (
    <Container>
      <MiniAvatar userId={userId} />
      {leaderNickName}
    </Container>
  );
};

export default Leader;
