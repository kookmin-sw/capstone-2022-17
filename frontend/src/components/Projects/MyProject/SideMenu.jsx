import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const Container = styled.div`
  line-height: 1.5rem;
  min-width: 150px;
  margin-right: 1.5rem;
  margin-top: 1rem;
`;

const SideMenu = ({ setStatus }) => {
  return (
    <Container>
      <Menu status="PROGRESS" setStatus={setStatus}>
        진행중인 프로젝트
      </Menu>
      <hr />
      <Menu status="DONE" setStatus={setStatus}>
        완료된 프로젝트
      </Menu>
      <hr />
      <Menu status="LIKES" setStatus={setStatus}>
        좋아요 한 프로젝트
      </Menu>
    </Container>
  );
};

export default SideMenu;
