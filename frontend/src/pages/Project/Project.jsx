import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tag from 'components/Tag/Tag';
import styled from 'styled-components';
import Title from 'components/Projects/Project/Title';
import Leader from 'components/Projects/Project/Leader';
import Likes from 'components/common/Likes';
import Views from 'components/Projects/Project/Views';
import Content from 'components/Projects/Project/Content';
import FloatingBox from 'components/FloatingBox/FloatingBox';
import { LOAD_PROJECT_REQUEST } from 'reducers/project';

const Container = styled.div`
  display: flex;
  min-width: 600px;
  max-width: 1200px;
  margin: 0 auto 5rem auto;
  position: relative;

  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) and (max-width: 1350px) {
    width: 1000px;
  }

  /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 750px;
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    width: 630px;
  }
`;

const ContentsBox = styled.div`
  margin-right: 1rem;
  width: 45rem;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  justify-content: space-between;
  margin: 1rem 0;
`;

const TagBox = styled.div`
  margin: 0.5rem 0;
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  border-bottom: 0.7px solid #adadad;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const IconBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

const Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { project, loadProjectDone } = useSelector((state) => state.project);

  useEffect(() => {
    if (loadProjectDone) {
      console.log(project);
    }
  }, [loadProjectDone]);

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECT_REQUEST,
      id,
    });
  }, []);

  return (
    <Container>
      {loadProjectDone ? (
        <>
          <ContentsBox>
            <TitleBox>
              <Title title={project.title} />
            </TitleBox>
            <TagBox>
              {project.techStack &&
                project.techStack.map((tech) => {
                  return <Tag techName={tech.stack} />;
                })}
            </TagBox>
            <InfoBox>
              <Leader leaderNickName={project.leaderNickName} userId={project.userId} />
              <IconBox>
                <Likes likesNum={project.likes} />
                <Views viewsNum={project.views} />
              </IconBox>
            </InfoBox>
            <Content content={project.description} />
          </ContentsBox>
          <FloatingBox project={project} />
        </>
      ) : null}
    </Container>
  );
};

export default Project;
