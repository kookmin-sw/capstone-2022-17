import React from 'react';
// , { useEffect, useState }
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import Card from 'components/Card/Card';
import Sort from 'components/Projects/ProjectList/Sort';
import { Grid } from 'semantic-ui-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { LOAD_PROJECTLIST_REQUEST } from 'reducers/projectList';

const Container = styled.div`
  min-width: 600px;
  max-width: 1200px;
  margin: 1rem auto 5rem auto;
`;

const Recommend = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1200px;
  justify-content: space-between;
`;

const LeftRecommend = styled.div`
  display: flex;
  margin: 2rem 1rem 5rem auto;
  border-bottom: 1px solid #d5d5d5;
`;

const RightRecommend = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto 5rem 1rem;
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1.3rem;
  color: #454545;
`;

const FilterDiv = styled.div`
  font-family: 'Pr-Regular';
  font-size: 1rem;
`;

const GridDiv = styled(Grid)`
  margin: 2rem 2rem !important;
`;

const SortDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProjectList = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { projectList, loadProjectListDone } = useSelector((state) => state.projectList);
  //   const [content, setContent] = useState([]);

  //   useEffect(() => {
  //     dispatch({
  //       type: LOAD_PROJECTLIST_REQUEST,
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log(projectList);
  //     if (loadProjectListDone) {
  //       setContent(projectList.content);
  //     }
  //   });

  return (
    <Container>
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon1.png`} />
        <Text>&nbsp; 구예진님에게 어울리는 프로젝트</Text>
      </TextBox>
      <Recommend>
        <LeftRecommend>
          <LeftRecoCard />
        </LeftRecommend>
        <RightRecommend>
          <RightRecoCard />
          <RightRecoCard />
          <RightRecoCard />
        </RightRecommend>
      </Recommend>
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon2.png`} />
        <Text>&nbsp; 구예진님! 이런 프로젝트는 어떠세요?</Text>
      </TextBox>
      <FilterDiv>포지션 지역 목적 분야 검색어입력 기술스택 검색</FilterDiv>
      <SortDiv>
        <Sort>최신순</Sort>
        <Sort>인기순</Sort>
      </SortDiv>
      <Grid>
        <GridDiv.Column mobile={8} tablet={6} computer={3}>
          {/* {content.map((project) => {
            return ( */}
          <Card
          // project={project}
          // key={project.id}
          // onClick={() => navigate(`project/${project.id}`)}
          />
          {/* );
          })} */}
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </GridDiv.Column>
      </Grid>
    </Container>
  );
};

export default ProjectList;
