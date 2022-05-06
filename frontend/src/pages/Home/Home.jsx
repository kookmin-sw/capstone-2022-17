import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  margin-top: 2rem;
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const Home = () => {
  return (
    <TestContainer>
      <div />
    </TestContainer>
  );
};

export default Home;
