import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.1rem;
  padding: 0.3rem 0.3rem 0 0;
`;

const RecoCardName = ({ cardName }) => {
  return <ProjectName> {cardName} </ProjectName>;
};

export default RecoCardName;
