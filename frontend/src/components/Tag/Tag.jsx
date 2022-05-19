import React from 'react';
import styled from 'styled-components';

const TagDiv = styled.div`
  font-size: 0.8rem;
  font-family: 'Pr-Light';
  color: #999999;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  margin: 0 0.2rem 0.5rem 0;
  display: inline-block;
`;

const Tag = ({ children }) => {
  return <TagDiv> {children} </TagDiv>;
};

export default Tag;
