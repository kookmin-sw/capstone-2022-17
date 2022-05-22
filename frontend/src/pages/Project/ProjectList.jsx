import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PROJECTLIST_REQUEST } from 'reducers/projectList';

import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

// import Paging from 'components/Projects/Pagination';
import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import Card from 'components/Card/Card';
import Sort from 'components/Projects/ProjectList/Sort';

// import numOption from '../Write/numOption';
// import positionOption from '../Write/postionOption';
// import fields from '../Write/fields';
// import regionOption from '../Write/regionOption';

const Container = styled.div`
  margin: -2.5rem auto 0rem auto;
`;

const ContentDiv = styled.div`
  min-width: 600px;
  max-width: 1200px;
  margin: 5rem auto -3rem auto;
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
  background-color: yellow;
  width: 100%;
  height: 10rem;
  text-align: center;
`;

const GridDiv = styled(Grid)`
  margin: 10rem 2rem 2rem 2rem !important;
  padding: 10rem 0;
`;

const SortDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// const Select = styled(Form.Select)`
//   font-size: 0.9rem !important;
//   margin-bottom: 0.4rem !important;

//   .menu > .item > .text {
//     font-size: 0.9rem !important;
//   }
// `;

// const PositionContainer = styled(Container.AlignMiddleContainer)`
//   &:hover {
//     .delete::before {
//       cursor: pointer;
//       visibility: visible;
//     }
//   }
// `;

// const Radio = styled(Form.Radio)`
//   label {
//     font-size: 0.9rem !important;
//     margin-right: 0.5rem;
//   }
// `;

// const AutoComplete = styled(Search)`
//   .input > input {
//     font-family: 'Pr-Regular' !important;
//     font-size: 0.9rem !important;
//   }
// `;

// const Tag = styled(Label)`
//   border-radius: 2rem !important;
// `;

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
      <ContentDiv>
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
      </ContentDiv>
      <ContentDiv>
        <TextBox>
          <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon2.png`} />
          <Text>&nbsp; 구예진님! 이런 프로젝트는 어떠세요?</Text>
        </TextBox>
        <FilterDiv>
          검색필터
          {/* 포지션
        <PositionContainer>
          <Select placeholder="포지션 선택" options={positionOption} />
        </PositionContainer>
        목적
        <Radio label="공모전" />
        <Radio label="토이프로젝트" />
        <Radio label="창업" />
        분야
        <Grid stackable columns={5}>
          <Grid.Row>
            {fields.map((f) => {
              return (
                <Grid.Column>
                  key={f.id} style={{ margin: '0.25rem 0' }}
                  <Radio
                    key={f.id}
                    label={f.name}
                    value={f.name}
                    checked={field === f.name}
                    onChange={(e, { value }) => setField(value)}
                    style={{ fontSize: '0.9rem' }}
                  />
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
        지역
        <Select placehodler="지역선택" options={regionOption} />
        검색어입력 기술스택 검색 */}
        </FilterDiv>
      </ContentDiv>
      <ContentDiv>
        <SortDiv>
          <Sort>최신순</Sort>
          <Sort>인기순</Sort>
        </SortDiv>
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
        {/* <Paging /> */}
      </ContentDiv>
    </Container>
  );
};

export default ProjectList;
