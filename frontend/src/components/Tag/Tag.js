import React from 'react';
import styled from 'styled-components';

const TagDiv = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: #707070;
  background-color: #e9eaeb;
  border-radius: 0.2rem;
  padding: 0.3rem;
`;

const Tag = ({ children }) => {
  return <TagDiv> {children} </TagDiv>;
};

export default Tag;
