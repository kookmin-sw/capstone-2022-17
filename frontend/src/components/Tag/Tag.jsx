import React from 'react';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';

const TagDiv = styled(Label)`
  font-size: 0.8rem !important;
  font-family: 'Pr-Light' !important;
  border-radius: 1rem !important;
  padding: 0.3rem 0.5rem !important;
  margin: 0 0.2rem 0.5rem 0 !important;
`;

const Tag = ({ techName }) => {
  return <TagDiv> {techName} </TagDiv>;
};

export default Tag;
