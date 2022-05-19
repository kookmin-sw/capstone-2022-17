import React from 'react';
import Card from 'components/Card/Card';
import styled from 'styled-components';
import { Icon, Grid } from 'semantic-ui-react';

const Container = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin-top: -3.5rem;
`;

const ContentContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center;
  /* max-width: 1200px; */
  /* width: 900px; */
`;

const GridDiv = styled(Grid)`
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  /* margin: 2rem 2rem !important; */
`;

const Banner = styled.img`
  width: 100%;
  margin-bottom: 3rem;
`;

const Content1 = styled.div`
  /* display: flex; */
  justify-content: center;
  /* max-width: 1200px; */
`;

const Content2 = styled.div`
  background-color: #f6f6f6;
  justify-content: center;
`;

const Img = styled.img`
  width: 1rem;
  height: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlusIcon = styled(Icon)`
  cursor: pointer !important;
`;

const TextBox = styled.div`
  display: flex;
`;

const Text = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1rem;
`;

const CardList = styled.div`
  display: flex;
`;

const Home = () => {
  return (
    <Container>
      <Banner src={`${process.env.PUBLIC_URL}/images/home/bannerImg.png`} />
      <ContentContainer>
        <Content1>
          <Title>
            <TextBox>
              <Img src={`${process.env.PUBLIC_URL}/images/home/mainIcon1.png`} />
              <Text> &nbsp; 구예진님! 이런 프로젝트는 어떠세요?</Text>
            </TextBox>
            <PlusIcon name="plus" style={{ cursor: 'pointer' }} />
          </Title>
          <Grid>
            <GridDiv.Column mobile={8} tablet={5.3} computer={4}>
              <Card />
            </GridDiv.Column>
            <GridDiv.Column mobile={8} tablet={5.3} computer={4}>
              <Card />
            </GridDiv.Column>
            <GridDiv.Column mobile={8} tablet={5.3} computer={4}>
              <Card />
            </GridDiv.Column>
            <GridDiv.Column mobile={8} tablet={5.3} computer={4} style={{ margin: '0 !important' }}>
              <Card />
            </GridDiv.Column>
          </Grid>
        </Content1>
        <Content2>
          <Title>
            <TextBox>
              <Img src={`${process.env.PUBLIC_URL}/images/home/mainIcon2.png`} />
              <Text>&nbsp;요즘 뜨는 프로젝트</Text>
            </TextBox>
            <PlusIcon name="plus" />
          </Title>
          <CardList>
            <Card />
            <Card />
            <Card />
            <Card />
          </CardList>
        </Content2>
        <Content1>
          <Title>
            <TextBox>
              <Img src={`${process.env.PUBLIC_URL}/images/home/mainIcon3.png`} />
              <Text>&nbsp;최근 올라온 프로젝트</Text>
            </TextBox>
            <PlusIcon name="plus" />
          </Title>
          <CardList>
            <Card />
            <Card />
            <Card />
            <Card />
          </CardList>
        </Content1>
      </ContentContainer>
    </Container>
  );
};

export default Home;
