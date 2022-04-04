import React from 'react';
import styled from 'styled-components';


const HeadCount = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    color: ${({ theme }) => theme.color.primary};
    display: flex;
`;

const HeadCountImg = styled.img`
    width: 100%;
`;

function CardHeadCount(props) {
    //현재 모집인원수와 총인원수 props로 받아서 나타냄.
    return (
        <HeadCount> 
            <HeadCountImg src="card/headCountImg.png"></HeadCountImg>
            {props.collectedCount}/{props.total} 
        </HeadCount>
    );
}

export default CardHeadCount; 
