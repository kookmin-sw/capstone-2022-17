import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MiniAvatar = ({ img }) => {
  return (
    <Container>
      <Img src={img} />
    </Container>
  );
};

export default MiniAvatar;
