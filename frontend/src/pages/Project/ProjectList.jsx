import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TECHSTACK_REQUEST } from 'reducers/techstack';
import { LOAD_PROJECTLIST_REQUEST, SIZE } from 'reducers/projectList';

import useInput from 'hooks/useInput';

import styled from 'styled-components';
import { Form, Icon, Grid, Search, Label, Input } from 'semantic-ui-react';

import Card from 'components/Card/Card';
import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import Sort from 'components/Projects/ProjectList/Sort';

import * as Ct from 'components/common/Containers';
import fieldOption from './fieldOption';
import purposeOption from './purposeOption';
import positionOption from './postionOption';
import regionOption from './regionOption';

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
  margin-bottom: 1rem;
`;

const SelectDiv = styled.div`
  display: flex;
  margin: 3rem 0 1rem 0;
`;

const SelectMiniDiv = styled.div`
  margin: 0 1rem 1rem 1rem;
  width: 100%;
`;

const Select = styled(Form.Select)`
  font-size: 0.9rem !important;

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
  width: 100%;
`;

const SortDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GridDiv = styled(Grid)`
  margin: 2rem 2rem !important;
`;

const StyledInput = styled(Input)`
  > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const AutoComplete = styled(Search)`
  .input > input {
    border-radius: 0.3rem !important;
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
  margin-bottom: 0.4rem !important;
`;

const resultRenderer = ({ stack }) => <div>{stack}</div>;

const ProjectList = () => {
  const [position, setPosition] = useState('전체');
  const [purpose, setPurpose] = useState('전체');
  const [region, setRegion] = useState('전체');
  const [field, setField] = useState('전체');
  const [search, onChangeSearch] = useInput('');
  // const [filterData, setFilterData] = useState({});

  // const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectList, loadProjectListDone } = useSelector((state) => state.projectList);
  const [content, setContent] = useState([]);

  const { techstacks, loadTechstacksLoading } = useSelector((state) => state.techstack);
  const [tech, onChangeTech, setTech] = useInput('');
  const [techlist, setTechlist] = useState([]);

  const handleResultSelect = (e, data) => {
    if (!techlist.includes(data.result.stack)) {
      setTechlist([...techlist, data.result.stack]);
    } else {
      alert('이미 입력된 기술스택입니다.');
    }
    setTech('');
  };

  const handleDeleteTag = (idx) => {
    setTechlist(techlist.filter((value, index) => index !== idx));
  };

  useEffect(() => {
    if (tech !== '') {
      dispatch({
        type: LOAD_TECHSTACK_REQUEST,
        name: tech,
      });
    }
  }, [tech]);

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECTLIST_REQUEST,
      data: {
        field: [field],
        positions: [position],
        purpose: [purpose],
        region,
        status: 'PROGRESS',
        techStacks: techlist,
        title: search,
      },
      page: 1,
      size: SIZE,
    });
  }, []);

  useEffect(() => {
    if (loadProjectListDone) {
      console.log(projectList);
      setContent([]);
    }
  }, [loadProjectListDone]);

  useEffect(() => {
    console.log(position, region, purpose, field);
  }, [position, region, purpose, field]);

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
              fluid
              placeholder="포지션"
              options={positionOption}
              value={position}
              onChange={(e, { value }) => setPosition(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>지역</FilterName>
            <Select
              fluid
              placehodler="지역"
              options={regionOption}
              value={region}
              onChange={(e, { value }) => setRegion(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>목적</FilterName>
            <Select
              fluid
              placeholder="목적"
              options={purposeOption}
              value={purpose}
              onChange={(e, { value }) => setPurpose(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>분야</FilterName>
            <Select
              fluid
              placeholder="분야"
              options={fieldOption}
              value={field}
              onChange={(e, { value }) => setField(value)}
            />
          </SelectMiniDiv>
        </SelectDiv>
        <SearchDiv>
          <SearchMiniDiv>
            <FilterName>검색어 입력</FilterName>
            <StyledInput fluid placeholder="검색어 입력" onChange={onChangeSearch} value={search} />
          </SearchMiniDiv>
          {/* 기술스택 시작 */}
          <SearchMiniDiv>
            <FilterName>기술스택</FilterName>
            <Ct.AlignMiddleContainer>
              <AutoComplete
                fluid
                placeholder="기술스택 검색"
                value={tech}
                onSearchChange={onChangeTech}
                results={techstacks}
                onResultSelect={handleResultSelect}
                loading={loadTechstacksLoading}
                resultRenderer={resultRenderer}
              />
            </Ct.AlignMiddleContainer>
            {/* 기술스택 끝 */}
          </SearchMiniDiv>
          <SearchMiniDiv>
            <Select fluid style={{ visibility: 'hidden' }} />
          </SearchMiniDiv>
          <SearchMiniDiv>
            <Select fluid style={{ visibility: 'hidden' }} />
          </SearchMiniDiv>
        </SearchDiv>
      </SearchBox>
      {/* 태그 시작 */}
      <Ct.RowStartContainer style={{ margin: '-1rem 0 3rem 0', flexWrap: 'wrap' }}>
        {techlist.map((stack, index) => {
          return (
            <Tag key={stack}>
              {stack}
              <Icon name="delete" onClick={() => handleDeleteTag(index)} />
            </Tag>
          );
        })}
      </Ct.RowStartContainer>
      {/* 태그 끝 */}
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
