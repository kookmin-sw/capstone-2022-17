import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import Avatar from './Avatar';

const UserMenu = () => {
  const navigate = useNavigate();

  const trigger = (
    <span>
      {/* 임시이미지 */}
      <Avatar img="https://cdn.eyesmag.com/content/uploads/posts/2020/12/09/tesla-elon-musk-moves-to-texas-1-5b119051-2c23-449b-b554-7445558ebf62.jpg" />
    </span>
  );

  const handleSignout = () => {
    // 로그아웃 기능 추가
    console.log('로그아웃');
  };

  return (
    <Dropdown direction="left" trigger={trigger} icon={null} style={{ margin: '0 2rem' }}>
      <Dropdown.Menu style={{ marginTop: '1.3rem' }}>
        <Dropdown.Item onClick={() => navigate('/profile')}>프로필</Dropdown.Item>
        <Dropdown.Item onClick={() => navigate('/account')}>계정관리</Dropdown.Item>
        <Dropdown.Item onClick={handleSignout}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
