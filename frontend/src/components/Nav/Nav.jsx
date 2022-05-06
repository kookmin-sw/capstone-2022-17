import React from 'react';
import styled from 'styled-components';
import Logo from 'components/Nav/Logo';
import NavMenu from 'components/Nav/NavMenu';
import PrimaryBtn from 'components/common/PrimaryBtn';
import NotiIcon from 'components/Nav/NotiIcon';
import UserMenu from 'components/Nav/UserMenu/UserMenu';

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 10vh;
  box-shadow: 0 4px 4px -4px black;
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

const Nav = () => {
  return (
    <NavContainer>
      <LeftContainer>
        <Logo />
        <NavMenu>프로젝트 둘러보기</NavMenu>
        <NavMenu>내 프로젝트</NavMenu>
      </LeftContainer>
      <RightContainer>
        <PrimaryBtn>프로젝트 생성</PrimaryBtn>
        <NotiIcon />
        <UserMenu />
      </RightContainer>
    </NavContainer>
  );
};

export default Nav;
