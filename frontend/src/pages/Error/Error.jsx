import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Container from 'components/common/Containers';
import COLOR from 'constant/color';
import * as Btn from 'components/common/Btn';

const ErrorContainer = styled(Container.ColumnMiddleContainer)`
  margin-top: 15rem;
`;

const CODE = styled.div`
  font-family: 'Pr-Black';
  background: linear-gradient(to right, ${COLOR.PRIMARY}, ${COLOR.SUB});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3.5rem;
`;

const Error = () => {
  const navigate = useNavigate();
  return (
    <ErrorContainer>
      <CODE>404 Error</CODE>
      여긴 아무것도 없는 것 같아요..
      <Btn.PrimaryBtn onClick={() => navigate('/')} style={{ marginTop: '3rem' }}>
        메인으로 이동하기
      </Btn.PrimaryBtn>
    </ErrorContainer>
  );
};

export default Error;
