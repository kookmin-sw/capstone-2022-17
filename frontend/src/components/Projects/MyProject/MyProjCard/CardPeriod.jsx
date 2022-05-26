import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 0.8rem;
  padding: 0 0.3rem 0.5rem 0.3rem;
`;

const CardPeriod = ({ startDate, endDate }) => {
  return (
    <ProjectName>
      {startDate} ~ {endDate}
    </ProjectName>
  );
};

export default CardPeriod;
