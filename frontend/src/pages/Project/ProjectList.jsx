import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import { Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PROJECTLIST_REQUEST } from 'reducers/projectList';

const Container = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1200px;
  margin: 2rem auto 5rem auto;
`;

const GridDiv = styled(Grid)`
  margin: 2rem 2rem !important;
`;

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, loadProjectListDone } = useSelector((state) => state.projectList);
  const [content, setContent] = useState([]);

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECTLIST_REQUEST,
      data: {},
      page: 1,
      size: 16,
    });
  }, []);

  useEffect(() => {
    console.log(projectList);
    if (loadProjectListDone) {
      setContent(projectList.content);
    }
  });

  return (
    <Container>
      <Grid>
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
      </Grid>
    </Container>
  );
};

export default ProjectList;
