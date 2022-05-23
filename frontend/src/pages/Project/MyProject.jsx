import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import SideMenu from 'components/Projects/MyProject/SideMenu';
import MyProjCard from 'components/Projects/MyProject/MyProjCard/MyProjCard';
import { Grid, Pagination } from 'semantic-ui-react';
import { SIZE, LOAD_MYPROJECTLIST_REQUEST } from 'reducers/projectList';
import * as Ct from 'components/common/Containers';

const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 1200px;
  margin: 2rem auto 10rem auto;
`;

const CardContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
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
  width: 100vw;
  max-width: 1000px;
`;

const GridDiv = styled(Grid.Column)`
  margin-bottom: -1rem;
`;

const MyProject = () => {
  const dispatch = useDispatch();
  const {
    myCurrentPage,
    myTotalPage,
    myProjectList,
    myTotalElements,
    loadMyProjectListDone,
    loadMyProjectListLoading,
  } = useSelector((state) => state.projectList);
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

  const handlePaginationChange = (e, { activePage }) => {
    dispatch({
      type: LOAD_MYPROJECTLIST_REQUEST,
      page: activePage,
      size: SIZE,
      status,
    });
  };

  return (
    <Container>
      <SideMenu status={status} setStatus={setStatus} />
      {myProjectList.length === 0 ? (
        <TextContainer>
          <Text>프로젝트가 없습니다!</Text>
        </TextContainer>
      ) : (
        <Ct.ColumnMiddleContainer>
          <GridContainer className={loadMyProjectListLoading ? 'loading' : null}>
            {myProjectList.map((project) => {
              return (
                <GridDiv tablet={6} computer={4}>
                  <MyProjCard project={project} />
                </GridDiv>
              );
            })}
          </GridContainer>
          {myTotalElements > SIZE && (
            <CardContainer>
              <Pagination
                activePage={myCurrentPage}
                onPageChange={handlePaginationChange}
                size="mini"
                siblingRange={2}
                totalPages={myTotalPage}
                secondary
              />
            </CardContainer>
          )}
        </Ct.ColumnMiddleContainer>
      )}
    </Container>
  );
};

export default MyProject;
