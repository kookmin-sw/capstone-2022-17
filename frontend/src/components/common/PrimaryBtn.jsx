import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const Btn = styled(Button)`
  background-color: ${({ theme }) => theme.color.primary} !important;
  color: white !important;
`;

const PrimaryBtn = ({ children }) => {
  return <Btn>{children}</Btn>;
};

export default PrimaryBtn;
