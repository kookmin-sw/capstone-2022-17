import React from 'react';
import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';
import Card from 'components/Card/Card';
import { Grid } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1300px;
  margin: 2rem auto 5rem auto;
  width: 70%;
`;

const GridDiv = styled(Grid)`
  margin-top: 1rem !important;
`;

const MyProject = () => {
  return (
    <Container>
      <SideMenu />
      <GridDiv stackable columns={3}>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
        <Grid.Column>
          <Card />
        </Grid.Column>
      </GridDiv>
    </Container>
  );
};

export default MyProject;
