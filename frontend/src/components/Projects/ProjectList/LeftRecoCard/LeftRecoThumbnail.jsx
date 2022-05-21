import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Img = styled.img`
  width: 40rem;
  object-fit: cover;
  border-radius: 1rem;
  height: 13rem;
`;

const LeftRecoThumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img || `${process.env.PUBLIC_URL}/images/card/cardImg1.png`} />
    </Container>
  );
};

export default LeftRecoThumbnail;
