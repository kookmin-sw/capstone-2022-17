import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PROJECTLIST_REQUEST } from 'reducers/projectList';

import styled from 'styled-components';
import { Form, Grid, Search } from 'semantic-ui-react';

import Card from 'components/Card/Card';
import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import Sort from 'components/Projects/ProjectList/Sort';

import positionOption from 'pages/Write/postionOption';
import regionOption from 'pages/Write/regionOption';
import fieldOption from './fieldOption';
import purposeOption from './purposeOption';

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
  margin: 1rem auto 3rem auto;
`;

const LeftRecoBox = styled.div`
  display: flex;
  margin: 0 1rem 1rem auto;
  border-bottom: 1px solid #d5d5d5;
`;

const RightRecoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem 1rem;
`;

const SearchBox = styled.div`
  margin: 0 auto 3rem 1rem;
`;

const FilterName = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1rem;
`;

const SelectDiv = styled.div`
  display: flex;
  margin: 3rem 0 1rem 0;
  justify-content: center;
`;

const SelectMiniDiv = styled.div`
  margin: 0 1rem 1rem 1rem;
`;

const Select = styled(Form.Select)`
  font-size: 0.9rem !important;
  margin: 1rem 0 !important;
  .menu > .item > .text {
    font-size: 0.9rem !important;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const SearchMiniDiv = styled.div`
  margin: 0 1rem 1rem 1rem;
`;

const SearchStyled = styled(Search)`
  margin: 1rem 0 !important;
`;

const SortDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GridDiv = styled(Grid)`
  margin: 2rem 2rem !important;
`;

const ProjectList = () => {
  // const [position, setPosition] = useState('전체');
  // const [purpose, setPurpose] = useState('전체');
  // const [region, setRegion] = useState('지역 미지정');
  // const [field, setField] = useState('분야 선택');
  // const [filterData, setFilterData] = useState({});

  // const { user } = useSelector((state) => state.authentication);
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
    if (loadProjectListDone) {
      console.log(projectList);
      setContent([]);
    }
  }, [loadProjectListDone]);

  return (
    <Container>
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon1.png`} />
        <Text>&nbsp; 구예진님에게 어울리는 프로젝트</Text>
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
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon2.png`} />
        <Text>&nbsp; 구예진님! 이런 프로젝트는 어떠세요?</Text>
      </TextBox>
      <SearchBox>
        <SelectDiv>
          <SelectMiniDiv>
            <FilterName>포지션</FilterName>
            <Select
              placeholder="포지션"
              options={positionOption}
              // onChange={(e, { value }) => setPosition(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>지역</FilterName>
            <Select
              placehodler="지역"
              options={regionOption}
              // value={region}
              // onChange={(e, { value }) => setRegion(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>목적</FilterName>
            <Select
              placeholder="목적"
              options={purposeOption}
              // onChange={(e, { value }) => setPurpose(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>분야</FilterName>
            <Select
              placeholder="분야"
              options={fieldOption}
              // onChange={(e, { name }) => setField(name)}
            />
          </SelectMiniDiv>
        </SelectDiv>
        <SearchDiv>
          <SearchMiniDiv>
            <FilterName>검색어 입력</FilterName>
            <SearchStyled placehodler="검색어 입력" />
          </SearchMiniDiv>
          기술스택 검색
        </SearchDiv>
      </SearchBox>
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
    </Container>
  );
};

export default ProjectList;
