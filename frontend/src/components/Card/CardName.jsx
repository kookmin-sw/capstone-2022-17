import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.2rem;
  color: #555555;
`;

const CardName = ({ children }) => {
  return <ProjectName> {children} </ProjectName>;
};

export default CardName;
