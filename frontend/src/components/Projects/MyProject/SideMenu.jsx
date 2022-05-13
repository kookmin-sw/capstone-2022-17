import React from 'react';
import styled from 'styled-components';
import Menu from './MenuName';

const Container = styled.div`
  font-family: 'Pr-Regular';
  line-height: 1.5rem;
`;

const SideMenu = () => {
  return (
    <Container>
      <Menu>진행중인 프로젝트</Menu>
      <hr />
      <Menu>완료된 프로젝트</Menu>
      <hr />
      <Menu>찜한 프로젝트</Menu>
    </Container>
  );
};

export default SideMenu;
