import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.text};
  margin: 0 0 0 0.3rem;
  color: #adadad;
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
