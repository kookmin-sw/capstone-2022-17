import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from 'components/Nav/Logo';
import NavMenu from 'components/Nav/NavMenu';
import UserMenu from 'components/Nav/UserMenu/UserMenu';
import * as Btn from 'components/common/Btn';
import SignBtn from 'components/Nav/SignBtn';

const NavContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  padding: 0.5rem 0;
  box-shadow: 1px 1px 10px -5px black;
  display: flex;
  justify-content: center;
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 2.5rem;
  margin: 0 3rem;
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

const Nav = () => {
  const { user } = useSelector((state) => state.authentication);

  return (
    <NavContainer>
      <NavContent>
        <LeftContainer>
          <Logo />
          <Link to="projects">
            <NavMenu>프로젝트 둘러보기</NavMenu>
          </Link>
          <Link to="myproject">
            <NavMenu>내 프로젝트</NavMenu>
          </Link>
        </LeftContainer>
        <RightContainer>
          {user ? (
            <>
              <Link to="write">
                <Btn.PrimaryBtn>프로젝트 생성</Btn.PrimaryBtn>
              </Link>
              <UserMenu />
            </>
          ) : (
            <SignBtn />
          )}
        </RightContainer>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;
