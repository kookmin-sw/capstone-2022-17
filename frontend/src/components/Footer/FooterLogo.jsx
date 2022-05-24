import React from 'react';
import styled from 'styled-components';

const LogoImg = styled.img`
  width: auto;
  height: 2rem;
  margin-right: 2rem;
  filter: grayscale(100%);
`;

const FooterLogo = () => {
  return <LogoImg src={`${process.env.PUBLIC_URL}/images/Logo.png`} />;
};

export default FooterLogo;
