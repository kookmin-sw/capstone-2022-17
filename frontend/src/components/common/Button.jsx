import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { darken } from 'polished';

export const PrimaryBtn = styled(Button)`
  background: ${({ theme }) => theme.color.primary} !important;
  color: white !important;
  font-family: 'NS-R' !important;
  font-weight: 100 !important;
  height: 3rem;
  font-size: 18px !important;

  &:hover {
    background: ${darken(0.2, '#797FD4')} !important;
  }
`;
