import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Avatar = ({ img }) => {
  return (
    <Container>
      <Img src={img} />
    </Container>
  );
};

export default Avatar;
