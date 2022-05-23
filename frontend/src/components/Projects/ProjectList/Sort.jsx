import React from 'react';
import styled from 'styled-components';
import COLOR from 'constant/color';

const Container = styled.div`
  font-size: 0.8rem;
  color: ${(props) => (props.order ? `${COLOR.PRIMARY}` : '#888888')};
  background-color: white;
  padding: 0.3rem 0.7rem;
  border: ${(props) => (props.order ? `1px solid ${COLOR.PRIMARY}` : '1px solid #888888')};
  border-radius: 0.1rem;
  cursor: pointer;

  &:hover {
    color: ${COLOR.PRIMARY};
    border: 1px solid ${COLOR.PRIMARY};
  }
`;

const Sort = ({ children, onClick, order }) => {
  return (
    <Container onClick={onClick} order={order}>
      {children}
    </Container>
  );
};

export default Sort;
