import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  height: 2.5rem;
  width: 2.5rem;
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
      <Img src={img || `${process.env.PUBLIC_URL}/images/missing.png`} />
    </Container>
  );
};

export default Avatar;
