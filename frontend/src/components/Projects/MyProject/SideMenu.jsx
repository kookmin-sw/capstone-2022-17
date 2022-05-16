import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Container = styled.div`
  line-height: 1.5rem;
  min-width: 150px;
  margin-right: 1.5rem;
  margin-top: 1rem;
`;

const SideMenu = () => {
  return (
    <Container>
      <Link to="projects">
        <Menu>진행중인 프로젝트</Menu>
      </Link>
      <hr />
      <Link to="projects">
        <Menu>완료된 프로젝트</Menu>
      </Link>
      <hr />
      <Link to="projects">
        <Menu>찜한 프로젝트</Menu>
      </Link>
    </Container>
  );
};

export default SideMenu;
