import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 1rem;
`;

const Img = styled.img`
  width: 40rem;
  object-fit: cover;
  border-radius: 1rem;
  height: 15rem;
`;

const LeftRecoThumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img} />
    </Container>
  );
};

export default LeftRecoThumbnail;
