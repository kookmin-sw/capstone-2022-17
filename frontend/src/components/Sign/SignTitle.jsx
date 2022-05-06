import React from 'react';
import { ColumnMiddleContainer } from 'components/common/Containers';
import styled from 'styled-components';

const Logo = styled.img`
  width: 15rem;
  height: 4rem;
`;

const P = styled.p`
  text-align: center;
  font-family: 'NS-R';
  font-size: 15px;
`;

const SignTitle = () => {
  return (
    <ColumnMiddleContainer>
      <Logo src="images/Logo.gif" alt="Logo" />
      <br />
      <P style={{ marginBottom: '5rem' }}>당신의 프로젝트, 여기서 구해보세요.</P>
    </ColumnMiddleContainer>
  );
};

export default SignTitle;
