import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TECHSTACK_REQUEST } from 'reducers/techstack';
import { LOAD_PROJECTLIST_REQUEST, LOAD_MAINPROJECTLIST_REQUEST, SIZE } from 'reducers/projectList';

import useInput from 'hooks/useInput';

import styled from 'styled-components';
import { Form, Icon, Grid, Search, Label, Input, Pagination } from 'semantic-ui-react';

import Card from 'components/Card/Card';
import LeftRecoCard from 'components/Projects/ProjectList/LeftRecoCard/LeftRecoCard';
import RightRecoCard from 'components/Projects/ProjectList/RightRecoCard/RightRecoCard';
import Sort from 'components/Projects/ProjectList/Sort';

import * as Ct from 'components/common/Containers';
import COLOR from 'constant/color';
import { PrimaryBtn } from 'components/common/Btn';
import fieldOption from './fieldOption';
import purposeOption from './purposeOption';
import positionOption from './postionOption';
import regionOption from './regionOption';

const Container = styled.div`
  min-width: 600px;
  max-width: 1200px;
  margin: 2rem auto 10rem auto;
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

const CardContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const RecommandContainer = styled(Ct.ColumnMiddleContainer)`
  position: relative;
  margin-bottom: 2rem;
`;

const Recommand = styled.div`
  filter: ${(props) => !props.user && 'blur(10px)'};
  pointer-events: ${(props) => !props.user && 'none'};
`;

const RedirectContainer = styled(Ct.ColumnMiddleContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  border: 1px solid #707070;
  background: white;
`;

const RecommandText = styled(Text)`
  font-family: 'Pr-Bold';
  font-size: 1.5rem;
  margin: 4rem 5rem 1.5rem 5rem;
  color: ${COLOR.GRAY};
  text-align: center;
  line-height: 2rem;
`;

const resultRenderer = ({ stack }) => <div>{stack}</div>;

const ProjectList = () => {
  const { user } = useSelector((state) => state.authentication);
  const [position, setPosition] = useState('??????');
  const [purpose, setPurpose] = useState('??????');
  const [region, setRegion] = useState('??????');
  const [field, setField] = useState('??????');
  const [search, onChangeSearch] = useInput('');
  const [order, setOrder] = useState('latest');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recommend, setRecommend] = useState([]);
  const {
    mainProjectList,
    loadMainProjectListLoading,
    loadMainProjectListDone,
    projectList,
    loadProjectListLoading,
    currentPage,
    totalPage,
  } = useSelector((state) => state.projectList);

  const { techstacks, loadTechstacksLoading } = useSelector((state) => state.techstack);
  const [tech, onChangeTech, setTech] = useInput('');
  const [techlist, setTechlist] = useState([]);

  const handleResultSelect = (e, data) => {
    if (!techlist.includes(data.result.stack)) {
      setTechlist([...techlist, data.result.stack]);
    } else {
      alert('?????? ????????? ?????????????????????.');
    }
    setTech('');
  };

  const handleDeleteTag = (idx) => {
    setTechlist(techlist.filter((value, index) => index !== idx));
  };

  const handlePaginationChange = (e, { activePage }) => {
    dispatch({
      type: LOAD_PROJECTLIST_REQUEST,
      page: activePage,
      size: SIZE,
      data: {
        field: field === '??????' ? null : [field],
        positions: position === '??????' ? null : [position],
        purpose: purpose === '??????' ? null : [purpose],
        region: region === '??????' ? null : region,
        status: 'IN_PROGRESS',
        techStacks: techlist,
        title: search,
        order,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECTLIST_REQUEST,
      page: 1,
      size: SIZE,
      data: {
        field: field === '??????' ? null : [field],
        positions: position === '??????' ? null : [position],
        purpose: purpose === '??????' ? null : [purpose],
        region: region === '??????' ? null : region,
        status: 'IN_PROGRESS',
        techStacks: techlist,
        title: search,
        order,
      },
    });
  }, [field, position, purpose, region, techlist, search, order]);

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
      type: LOAD_MAINPROJECTLIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (loadMainProjectListDone) {
      setRecommend(mainProjectList.recommend);
    }
  }, [loadMainProjectListDone]);

  return (
    <Container style={!user ? { marginTop: '0' } : null}>
      <RecommandContainer>
        <Recommand user={user}>
          <TextBox>
            <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon1.png`} />
            <Text>&nbsp; {user ? `${user.user.nickname}???` : '??????'}?????? ???????????? ????????????</Text>
          </TextBox>
          <RecoBox>
            <LeftRecoBox>
              <LeftRecoCard
                done={loadMainProjectListDone}
                loading={loadMainProjectListLoading}
                project={recommend[0]}
              />
            </LeftRecoBox>
            <RightRecoBox>
              {recommend.length > 0 &&
                recommend.slice(1, 4).map((recoproject) => {
                  return (
                    <RightRecoCard
                      done={loadMainProjectListDone}
                      loading={loadMainProjectListLoading}
                      project={recoproject}
                    />
                  );
                })}
              {recommend.length < 1 &&
                [...Array(3)].map((recoproject) => {
                  return (
                    <RightRecoCard
                      done={loadMainProjectListDone}
                      loading={loadMainProjectListLoading}
                      project={recoproject}
                    />
                  );
                })}
            </RightRecoBox>
          </RecoBox>
        </Recommand>
        {!user && (
          <RedirectContainer>
            <RecommandText>
              ?????? ????????? ??? ????????? ??????
              <br /> ?????? ??????????????? ???????????????!
            </RecommandText>
            <PrimaryBtn
              onClick={() => navigate('/signin')}
              style={{ width: '10rem', marginBottom: '3rem' }}
            >
              ?????????
            </PrimaryBtn>
          </RedirectContainer>
        )}
      </RecommandContainer>
      <TextBox>
        <Img src={`${process.env.PUBLIC_URL}/images/projectList/projectListIcon2.png`} />
        <Text>&nbsp; {user && `${user.user.nickname}???!`} ?????? ??????????????? ?????????????</Text>
      </TextBox>
      <SearchBox>
        <SelectDiv>
          <SelectMiniDiv>
            <FilterName>?????????</FilterName>
            <Select
              fluid
              placeholder="?????????"
              options={positionOption}
              value={position}
              onChange={(e, { value }) => setPosition(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>??????</FilterName>
            <Select
              fluid
              placehodler="??????"
              options={regionOption}
              value={region}
              onChange={(e, { value }) => setRegion(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>??????</FilterName>
            <Select
              fluid
              placeholder="??????"
              options={purposeOption}
              value={purpose}
              onChange={(e, { value }) => setPurpose(value)}
            />
          </SelectMiniDiv>
          <SelectMiniDiv>
            <FilterName>??????</FilterName>
            <Select
              fluid
              placeholder="??????"
              options={fieldOption}
              value={field}
              onChange={(e, { value }) => setField(value)}
            />
          </SelectMiniDiv>
        </SelectDiv>
        <SearchDiv>
          <SearchMiniDiv>
            <FilterName>????????? ??????</FilterName>
            <StyledInput fluid placeholder="????????? ??????" onChange={onChangeSearch} value={search} />
          </SearchMiniDiv>
          {/* ???????????? ?????? */}
          <SearchMiniDiv>
            <FilterName>????????????</FilterName>
            <Ct.AlignMiddleContainer>
              <AutoComplete
                fluid
                placeholder="???????????? ??????"
                value={tech}
                onSearchChange={onChangeTech}
                results={techstacks}
                onResultSelect={handleResultSelect}
                loading={loadTechstacksLoading}
                resultRenderer={resultRenderer}
              />
            </Ct.AlignMiddleContainer>
            {/* ???????????? ??? */}
          </SearchMiniDiv>
          <SearchMiniDiv>
            <Select fluid style={{ visibility: 'hidden' }} />
          </SearchMiniDiv>
          <SearchMiniDiv style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <SortDiv>
              <Sort order={order === 'latest'} onClick={() => setOrder('latest')}>
                ?????????
              </Sort>
              <Sort order={order === 'score'} onClick={() => setOrder('score')}>
                ?????????
              </Sort>
            </SortDiv>
          </SearchMiniDiv>
        </SearchDiv>
      </SearchBox>
      {/* ?????? ?????? */}
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
      {/* ?????? ??? */}
      <Grid className={loadProjectListLoading ? 'loading' : null} style={{ width: '1200px' }}>
        {projectList?.map((project) => {
          return (
            <GridDiv.Column mobile={8} tablet={6} computer={4}>
              <Card
                loading={loadProjectListLoading}
                project={project}
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
              />
            </GridDiv.Column>
          );
        })}
        {projectList?.length === 0 && <Text style={{ margin: '3rem' }}>?????? ????????? ????????????.</Text>}
      </Grid>
      <CardContainer>
        {projectList?.length !== 0 && (
          <Pagination
            activePage={currentPage}
            onPageChange={handlePaginationChange}
            size="mini"
            siblingRange={2}
            totalPages={totalPage}
            secondary
          />
        )}
      </CardContainer>
    </Container>
  );
};

export default ProjectList;
