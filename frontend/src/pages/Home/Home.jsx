import React from 'react';
import Card from 'components/Card/Card';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -3.5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Banner = styled.img`
  width: 100vw;
  /* height: 45vh; */
  margin-bottom: 3rem;
  object-fit: cover;
  border-bottom: 1px solid #cecece;
`;

const Content1 = styled.div`
  width: 100vw;
  max-width: 1200px;
  padding: 0 5rem !important;
`;

const Content2 = styled.div`
  width: 100vw;
  max-width: 1200px;
  padding: 0 5rem !important;
`;

const Content2Bg = styled.div`
  background-color: #f6f6f6;
  width: 100%;
  padding: 2rem 0 1rem 0;
  margin: 1rem 0 2.5rem 0;
  display: flex;
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
  font-size: 1.2rem;
`;

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
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
          <CardList>
            <Card />
            <Card />
            <Card />
            <Card />
          </CardList>
        </Content1>
        <Content2Bg>
          <Content2>
            <Title>
              <TextBox>
                <Img src={`${process.env.PUBLIC_URL}/images/home/mainIcon2.png`} />
                <Text>&nbsp; 요즘 뜨는 프로젝트</Text>
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
        </Content2Bg>
        <Content1>
          <Title>
            <TextBox>
              <Img src={`${process.env.PUBLIC_URL}/images/home/mainIcon3.png`} />
              <Text>&nbsp; 최근 올라온 프로젝트</Text>
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
