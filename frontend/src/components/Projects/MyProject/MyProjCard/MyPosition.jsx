import React from 'react';
import styled from 'styled-components';

const Position = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem 0.3rem 0.5rem 0.3rem;
`;

const MyPosition = ({ myPosition }) => {
  return <Position> 포지션: {myPosition} </Position>;
};

export default MyPosition;
