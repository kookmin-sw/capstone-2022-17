import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/profile/${userId}`)}>
      <MiniAvatar userId={userId} />
      {leaderNickName}
    </Container>
  );
};

export default Leader;
