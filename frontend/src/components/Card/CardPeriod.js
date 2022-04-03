import React from 'react';
import styled from 'styled-components';


    const ProjectPeriod = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    color: #A0A0A0;
`;

function CardPeriod(props) {
    //모집날짜 props로 받아서 나타냄.
    return (
        <ProjectPeriod> {props.startDate} ~ {props.endDate} </ProjectPeriod>
    );
}

export default CardPeriod; 
