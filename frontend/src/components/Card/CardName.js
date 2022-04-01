import React from 'react';
import styled from 'styled-components';

const ProjectName = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.black};
`;

function CardName(props) {
    //카드명 props로 받아서 나타냄.
    return (
        <ProjectName> {props.projectName} </ProjectName>
    );
}

export default CardName;