import React from 'react';
import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';

const Container = styled.div`
  margin-top: 2rem;
  /* ${({ theme }) => theme.common.flexCenter}; */
  display: flex;
  font-size: 0.9rem;
`;

const MyProject = () => {
  return (
    <Container>
      <SideMenu />
    </Container>
  );
};

export default MyProject;
