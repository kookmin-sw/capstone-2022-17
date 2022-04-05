import React from 'react';
import styled from 'styled-components';

const TagDiv = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    color: #707070;
    background-color: #E9EAEB;
    border-radius: 0.2rem;
    padding: 0.3rem;
`;

function Tag(props) {
    //태그 props로 받아서 나타냄.
    return (
        <TagDiv> {props.tagName} </TagDiv>
    );
}

export default Tag; 
