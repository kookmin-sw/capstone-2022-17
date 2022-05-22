import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import Avatar from './Avatar';

const DropItem = styled(Dropdown.Item)`
  font-family: 'Pr-Regular';
  font-size: 0.9rem !important;
`;

const UserMenu = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);

  const trigger = (
    <span>
      <Avatar />
    </span>
  );

  const handleSignout = () => {
    localStorage.removeItem('user');
    window.location.replace('/');
  };

  return (
    <Dropdown direction="left" trigger={trigger} icon={null} style={{ margin: '0 2rem' }}>
      <Dropdown.Menu style={{ marginTop: '1rem' }}>
        <DropItem onClick={() => navigate(`/profile/${user.user.id}`)}>프로필</DropItem>
        <DropItem onClick={() => navigate('/account')}>계정관리</DropItem>
        <DropItem onClick={handleSignout}>로그아웃</DropItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
