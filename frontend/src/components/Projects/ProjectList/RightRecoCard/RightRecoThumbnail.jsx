import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 1rem;
`;

const Img = styled.img`
  width: 13rem;
  height: 8rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 1rem;
`;

const RightRecoThumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img || `${process.env.PUBLIC_URL}/images/card/cardImg2.png`} />
    </Container>
  );
};

export default RightRecoThumbnail;
