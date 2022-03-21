import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  margin-top: 2rem;
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const TestButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.paragraph};
  color: ${({ theme }) => theme.color.primary};
  border: 3px solid ${({ theme }) => theme.color.primary};
`;

const Home = () => {
  return (
    <TestContainer>
      <TestButton>Home</TestButton>
    </TestContainer>
  );
};

export default Home;
