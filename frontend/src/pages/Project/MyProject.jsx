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
  margin: 2rem 2rem !important;
`;

const MyProject = () => {
  return (
    <Container>
      <SideMenu />
      <Grid>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
        <GridDiv.Column mobile={8} tablet={5.3} computer={5}>
          <Card />
        </GridDiv.Column>
      </Grid>
    </Container>
  );
};

export default MyProject;
