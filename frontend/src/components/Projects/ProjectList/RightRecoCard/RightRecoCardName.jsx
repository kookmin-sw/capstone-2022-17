import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.1rem;
  padding: 0.3rem 0.3rem 0 0;
`;

const RightRecoCardName = ({ cardName }) => {
  return (
    <ProjectName>{cardName.length > 7 ? cardName.substr(0, 7).concat('..') : cardName}</ProjectName>
  );
};

export default RightRecoCardName;
