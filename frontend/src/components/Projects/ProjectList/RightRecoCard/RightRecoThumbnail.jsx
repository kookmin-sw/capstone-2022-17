import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 1rem;
`;

const Img = styled.img`
  width: 13rem;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 1rem;
`;

const RightRecoThumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img} />
    </Container>
  );
};

export default RightRecoThumbnail;
