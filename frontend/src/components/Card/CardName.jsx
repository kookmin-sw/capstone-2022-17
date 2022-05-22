import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 0.3rem 0.5rem 0.3rem;
`;

const CardName = ({ cardName }) => {
  return <ProjectName> {cardName} </ProjectName>;
};

export default CardName;
