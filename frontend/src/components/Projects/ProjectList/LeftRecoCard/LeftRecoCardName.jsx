import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.3rem;
  padding: 0.3rem 0.3rem 0 0.3rem;
`;

const RecoCardName = ({ cardName }) => {
  return <ProjectName> {cardName} </ProjectName>;
};

export default RecoCardName;
