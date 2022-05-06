import React from 'react';
import styled from 'styled-components';

const LogoText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.title};
  color: ${({ theme }) => theme.color.primary};
`;

const Logo = () => {
  return <LogoText>Teamming</LogoText>;
};

export default Logo;
