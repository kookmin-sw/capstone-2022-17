import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid;
`;

const CardName = ({ children }) => {
  return <ProjectName> {children} </ProjectName>;
};

export default CardName;
