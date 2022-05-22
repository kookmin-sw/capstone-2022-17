import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  font-size: 0.7rem;
  font-family: 'Pr-ExtraLight';
  color: #adadad;

  display: flex;
  margin: 0 0 0 0.3rem;
`;

const Views = ({ viewsNum }) => {
  return (
    <Container>
      <Icon name="eye" />
      {viewsNum}
    </Container>
  );
};

export default Views;
