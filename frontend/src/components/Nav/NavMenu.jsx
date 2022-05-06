import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  font-size: 1.2rem;
`;

const NavMenu = ({ children }) => {
  return <Menu>{children}</Menu>;
};

export default NavMenu;
