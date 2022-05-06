import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  font-size: 1.2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const NavMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};

export default NavMenu;
