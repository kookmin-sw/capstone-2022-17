import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  width: auto;
  height: 2rem;
  margin-right: 2rem;
`;

const Logo = () => {
  return (
    <LogoImg
      onClick={() => window.location.replace('/')}
      src={`${process.env.PUBLIC_URL}/images/Logo.png`}
    />
  );
};

export default Logo;
