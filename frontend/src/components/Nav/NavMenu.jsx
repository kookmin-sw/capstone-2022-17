import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  font-size: 0.9rem;
  margin-right: 1.4rem;
  cursor: pointer;
`;

const NavMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};

export default NavMenu;
