import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const Thumbnail = ({ img }) => {
  return (
    <Container>
      <Img src={img} />
    </Container>
  );
};

export default Thumbnail;
