import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  margin-top: 2rem;
  ${({ theme }) => theme.common.flexCenterColumn};
  font-size: 1.2rem;
`;

const Home = () => {
  return (
    <TestContainer>
      <p>이것은 테스트용 글씨입니다. 엘렐레렐.</p>
    </TestContainer>
  );
};

export default Home;
