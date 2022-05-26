import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const Img = styled.img`
  width: 40rem;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 15rem;
`;

const LeftRecoThumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img || `${process.env.PUBLIC_URL}/images/card/cardImg5.png`} />
    </Container>
  );
};

export default LeftRecoThumbnail;
