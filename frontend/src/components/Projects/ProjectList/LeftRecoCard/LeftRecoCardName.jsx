import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.3rem;
  padding: 0.3rem 0.3rem 0 0.3rem;
`;

const LeftRecoCardName = ({ cardName }) => {
  return (
    <ProjectName>
      {cardName.length > 30 ? cardName.substr(0, 30).concat('..') : cardName}
    </ProjectName>
  );
};

export default LeftRecoCardName;
