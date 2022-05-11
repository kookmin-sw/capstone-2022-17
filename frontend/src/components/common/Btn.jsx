import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { darken } from 'polished';
import COLOR from 'constant/color';

export const PrimaryBtn = styled(Button)`
  background: linear-gradient(to right, ${COLOR.PRIMARY}, ${COLOR.SUB}) !important;
  color: white !important;
  font-family: 'PR-Light' !important;
  height: 3rem;
  font-size: 18px !important;

  &:hover {
    background: linear-gradient(
      to right,
      ${darken(0.1, COLOR.PRIMARY)},
      ${darken(0.1, COLOR.SUB)}
    ) !important;
  }
`;
