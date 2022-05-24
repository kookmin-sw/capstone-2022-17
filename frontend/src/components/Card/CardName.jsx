import COLOR from 'constant/color';
import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.2rem;
  padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  color: ${COLOR.GRAY};
`;

const CardName = ({ cardName }) => {
  return (
    <ProjectName>
      {cardName.length > 11 ? cardName.substr(0, 11).concat('...') : cardName}
    </ProjectName>
  );
};

export default CardName;
