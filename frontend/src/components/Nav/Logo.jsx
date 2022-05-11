import React from 'react';
import styled from 'styled-components';
import COLOR from 'constant/color';

const LogoText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin-right: 3rem;
  cursor: pointer;
`;

const Logo = () => {
  return <LogoText onClick={() => window.location.replace('/')}>TEAMMING</LogoText>;
};

export default Logo;
