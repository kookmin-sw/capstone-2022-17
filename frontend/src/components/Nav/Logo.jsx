import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  width: auto;
  height: 2.5rem;
  margin-right: 3rem;
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
