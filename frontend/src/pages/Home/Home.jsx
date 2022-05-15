import React from 'react';
import styled from 'styled-components';
import ApplyBtn from 'components/Projects/ApplyModal/ApplyBtn';

const TestContainer = styled.div`
  margin-top: 2rem;
  ${({ theme }) => theme.common.flexCenterColumn};
  font-size: 0.9rem;
`;

const Home = () => {
  return (
    <TestContainer>
      <p>지원 모달 테스트용</p>
      <br />
      <ApplyBtn />
    </TestContainer>
  );
};

export default Home;
