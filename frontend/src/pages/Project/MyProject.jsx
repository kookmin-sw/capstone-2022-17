import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';
import MyProjCard from 'components/Projects/MyProject/MyProjCard/MyProjCard';
import { Grid } from 'semantic-ui-react';
import { SIZE, LOAD_MYPROJECTLIST_REQUEST } from 'reducers/projectList';

const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 1200px;
  margin: 2rem auto 5rem auto;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 990px;
  height: 20rem;

  opacity: 0.4;
  background-color: #dedddd;
`;

const Text = styled.div`
  font-size: 1.5rem;
`;

const GridContainer = styled(Grid)`
  width: 100%;
  max-width: 1000px;
`;

const GridDiv = styled(Grid.Column)`
  margin-bottom: -1rem;
`;

const MyProject = () => {
  const dispatch = useDispatch();
  const { myCurrentPage, myTotalPage, myProjectList, loadMyProjectListDone } = useSelector(
    (state) => state.projectList,
  );
  const [status, setStatus] = useState('PROGRESS');

  useEffect(() => {
    if (loadMyProjectListDone) {
      console.log(myCurrentPage, myTotalPage, myProjectList);
    }
  }, [loadMyProjectListDone]);

  // 최초 1회
  useEffect(() => {
    dispatch({
      type: LOAD_MYPROJECTLIST_REQUEST,
      page: 1,
      size: SIZE,
      status: 'PROGRESS',
    });
  }, []);

  // 버튼 누를때마다 상태 변경
  useEffect(() => {
    dispatch({
      type: LOAD_MYPROJECTLIST_REQUEST,
      page: 1,
      size: SIZE,
      status,
    });
  }, [status]);

  return (
    <Container>
      <SideMenu status={status} setStatus={setStatus} />
      {myProjectList.length === 0 ? (
        <TextContainer>
          <Text>프로젝트가 없습니다!</Text>
        </TextContainer>
      ) : (
        <GridContainer>
          {myProjectList.map((project) => {
            return (
              <GridDiv tablet={6} computer={4}>
                <MyProjCard project={project} />
              </GridDiv>
            );
          })}
        </GridContainer>
      )}
    </Container>
  );
};

export default MyProject;
