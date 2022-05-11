import React from 'react';
import styled from 'styled-components';
import Logo from 'components/Nav/Logo';
import NavMenu from 'components/Nav/NavMenu';
import NotiIcon from 'components/Nav/NotiIcon';
import UserMenu from 'components/Nav/UserMenu/UserMenu';
import * as Btn from 'components/common/Btn';

const NavContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 0.5rem;
  box-shadow: 1px 1px 10px -5px black;
  display: flex;
  justify-content: center;
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NewProjectBtn = styled(Btn.PrimaryBtn)`
  border-radius: 2.5rem !important;
  height: 2.5rem;
  padding: 0.5rem 1.5rem !important;
`;

const Nav = () => {
  return (
    <NavContainer>
      <NavContent>
        <LeftContainer>
          <Logo />
          <NavMenu>프로젝트 둘러보기</NavMenu>
          <NavMenu>내 프로젝트</NavMenu>
        </LeftContainer>
        <RightContainer>
          <NewProjectBtn>프로젝트 생성</NewProjectBtn>
          <NotiIcon />
          <UserMenu />
        </RightContainer>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;
