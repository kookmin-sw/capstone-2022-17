import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: auto;
`;

const Thumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img || `${process.env.PUBLIC_URL}/images/card/cardImg1.png`} />
    </Container>
  );
};

export default Thumbnail;
