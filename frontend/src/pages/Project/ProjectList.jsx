import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import React from 'react';
// , { useEffect, useState }
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import Card from 'components/Card/Card';
// import { Grid } from 'semantic-ui-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { LOAD_PROJECTLIST_REQUEST } from 'reducers/projectList';

const Container = styled.div`
  min-width: 600px;
  max-width: 1200px;
  margin: 2rem auto 5rem auto;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1.3rem;
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const RecoBox = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1200px;
  margin: 1rem auto 2rem auto;
`;

const LeftRecoBox = styled.div`
  display: flex;
  margin: 0 1rem 5rem auto;
  border-bottom: 1px solid #d5d5d5;
`;

const RightRecoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 5rem 1rem;
`;

// const GridDiv = styled(Grid)`
//   margin: 2rem 2rem !important;
// `;

const ProjectList = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { projectList, loadProjectListDone } = useSelector((state) => state.projectList);
  // const [content, setContent] = useState([]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_PROJECTLIST_REQUEST,
  //     data: {},
  //     page: 1,
  //     size: 16,
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(projectList);
  //   if (loadProjectListDone) {
  //     setContent(projectList.content);
  //   }
  // });

  return (
    <Container>
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon1.png`} />
        <Text>&nbsp; 구예진님! 이런 프로젝트는 어떠세요?</Text>
      </TextBox>
      <RecoBox>
        <LeftRecoBox>
          <LeftRecoCard />
        </LeftRecoBox>
        <RightRecoBox>
          <RightRecoCard />
          <RightRecoCard />
          <RightRecoCard />
        </RightRecoBox>
      </RecoBox>
      {/* <Grid>
        <GridDiv.Column mobile={8} tablet={6} computer={4}>
          {content.map((project) => {
            return (
              <Card
                project={project}
                key={project.id}
                onClick={() => navigate(`project/${project.id}`)}
              />
            );
          })}
        </GridDiv.Column>
      </Grid> */}
    </Container>
  );
};

export default ProjectList;
