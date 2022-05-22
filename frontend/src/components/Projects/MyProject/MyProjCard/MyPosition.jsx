import React from 'react';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';

const Position = styled(Label)`
  font-size: 0.8rem !important;
  font-family: 'Pr-Light' !important;
  border-radius: 1rem !important;
  margin-top: 0.3rem !important;
`;

const MyPosition = ({ myPosition }) => {
  return <Position> {myPosition} </Position>;
};

export default MyPosition;
