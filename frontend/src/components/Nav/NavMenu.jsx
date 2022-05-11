import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  font-size: 1.15rem;
  margin-right: 2rem;
  cursor: pointer;
`;

const NavMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};

export default NavMenu;
