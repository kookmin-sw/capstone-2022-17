import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { darken } from 'polished';
import COLOR from 'constant/color';

export const PrimaryBtn = styled(Button)`
  height: 2rem;
  color: white !important;
  background: linear-gradient(to right, ${COLOR.PRIMARY}, ${COLOR.SUB}) !important;
  font-family: 'PR-Light' !important;
  font-size: 0.9rem !important;
  border-radius: 2.5rem !important;
  padding: 0.5rem 1.2rem !important;

  &:hover {
    background: linear-gradient(
      to right,
      ${darken(0.1, COLOR.PRIMARY)},
      ${darken(0.1, COLOR.SUB)}
    ) !important;
  }
`;

export const SubBtn = styled(PrimaryBtn)`
  background: ${COLOR.LIGHTGRAY} !important;
  color: ${COLOR.WHITE} !important;

  &:hover {
    background: ${darken(0.1, COLOR.LIGHTGRAY)} !important;
  }
`;
