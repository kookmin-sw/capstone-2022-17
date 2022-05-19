import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import useInput from 'hooks/useInput';
import { Label, Icon, Search } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import SurveyLayout from 'components/Survey/SurveyLayout';
import SubTitle from 'components/Survey/SubTitle';
import NextBtn from 'components/Survey/NextBtn';
import { LOAD_TECHSTACK_REQUEST } from 'reducers/techstack';

const TechContainer = styled(Container.ColumnMiddleContainer)`
  width: 40rem;
  background-color: #fff;
  border-radius: 2rem;
  padding: 3rem;
  margin: 4rem 0;
  box-shadow: 1px 1px 10px -5px black;
`;

const AutoComplete = styled(Search)`
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
  margin: 0.5rem !important;
`;

const resultRenderer = ({ stack }) => <div>{stack}</div>;

const TechStack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [techlist, setTechlist] = useState([]);
  const [tech, onChangeTech, setTech] = useInput('');
  const { techstacks, loadTechstacksLoading } = useSelector((state) => state.techstack);

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

  return (
    <FadeIn delay={800} transitionDuration={600} wrapperTag={SurveyLayout}>
      <SubTitle>사용할 수 있는 기술 스택을 알려주세요!</SubTitle>
      <TechContainer>
        <AutoComplete
          placeholder="기술스택 검색"
          value={tech}
          onSearchChange={onChangeTech}
          results={techstacks}
          onResultSelect={handleResultSelect}
          loading={loadTechstacksLoading}
          resultRenderer={resultRenderer}
        />
        <Container.AlignCenterContainer style={{ margin: '2rem 0', flexWrap: 'wrap' }}>
          {techlist.map((stack, index) => {
            return (
              <Tag key={stack}>
                {stack}
                <Icon name="delete" onClick={() => handleDeleteTag(index)} />
              </Tag>
            );
          })}
        </Container.AlignCenterContainer>
        <NextBtn onClick={() => navigate('/')} />
      </TechContainer>
    </FadeIn>
  );
};

export default TechStack;
