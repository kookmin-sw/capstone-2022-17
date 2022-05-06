import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.black};
`;

const CardName = ({ children }) => {
  return <ProjectName> {children} </ProjectName>;
};

export default CardName;
