import React from 'react';
import styled from 'styled-components';

const ProjectStatus = styled.div`
  font-size: ${({ theme }) => theme.fontSize.text};
  color: #ffffff;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

// function CardStatus(props) {
//   // 모집상태 props로 받아서 나타냄.
//   return <ProjectStatus> {props.status} </ProjectStatus>;
// }
const CardStatus = ({ children }) => {
  return <ProjectStatus> {children} </ProjectStatus>;
};

export default CardStatus;
