import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';
import MyProjCard from 'components/Projects/MyProject/MyProjCard/MyProjCard';
import { Grid } from 'semantic-ui-react';
import { SIZE, LOAD_MYPROJECTLIST_REQUEST } from 'reducers/projectList';

const Container = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1200px;
  margin: 2rem auto 5rem auto;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70rem;
  height: 20rem;

  opacity: 0.4;
  background-color: #dedddd;
`;

const Text = styled.div`
  font-size: 1.5rem;
`;

const GridDiv = styled(Grid)`
  margin: 2rem 2rem !important;
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
        <Grid>
          {myProjectList.map((project) => {
            return (
              <GridDiv.Column tablet={6} computer={4}>
                <MyProjCard project={project} />
              </GridDiv.Column>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default MyProject;
