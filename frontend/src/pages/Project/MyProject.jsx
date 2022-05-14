import React from 'react';
import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';
import Card from 'components/Card/Card';

const Container = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1300px;
  margin: 2rem auto 5rem auto;
  position: relative;
  width: 70%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MyProject = () => {
  return (
    <Container>
      <SideMenu />
      <CardContainer>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardContainer>
    </Container>
  );
};

export default MyProject;
