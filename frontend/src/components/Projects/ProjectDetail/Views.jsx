import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  font-size: 0.6rem;
  font-family: 'Pr-ExtraLight';
  color: #adadad;

  display: flex;
  margin: 0 0 0 0.3rem;
`;

const Views = ({ children }) => {
  return (
    <Container>
      <Icon name="eye" />
      {children}
    </Container>
  );
};

export default Views;
