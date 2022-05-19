import React, { useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import axios from 'axios';
import authHeader from 'sagas/auth-header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { toStringByFormatting } from 'utils/format';

import './toastui-editor.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import { LOAD_TECHSTACK_REQUEST } from 'reducers/techstack';
import { Form, Icon, Grid, Search, Label } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import SubmitWrite from 'components/Write/SubmitWrite';

import numOption from './numOption';
import positionOption from './postionOption';
import fields from './fields';
import regionOption from './regionOption';

const WriteContainer = styled(Container.ColumnStartContainer)`
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto;
`;

const TitleIcon = styled.img`
  width: 1.8rem;
  height: auto;
  margin-right: 0.5rem;
`;

const Title = styled.input`
  font-family: 'Pr-SemiBold';
  font-size: 1.6rem;
`;

const InputContainer = styled(Container.RowStartContainer)`
  width: 100%;
  max-width: 1300px;
  margin: 2rem 0;
  padding: 2rem 2.5rem 0 2.5rem;
  border-radius: 0.5rem;
  border: 2px solid #cecece;
`;

const Field = styled(Form.Field)`
  margin-bottom: 2rem !important;
`;

const InputLabel = styled.label`
  font-size: 0.95rem;
  font-family: 'Pr-SemiBold';
  margin-bottom: 1rem !important;
`;

const Requiredlabel = styled(InputLabel)`
  ::after {
    margin: -0.2em 0 0 0.2em;
    content: '*';
    color: #db2828;
  }
`;

const Select = styled(Form.Select)`
  font-size: 0.9rem !important;
  margin-bottom: 0.4rem !important;

  .menu > .item > .text {
    font-size: 0.9rem !important;
  }
`;

const NumSelect = styled(Select)`
  min-width: 4rem !important;
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
`;

const Input = styled(Form.Input)`
  margin-bottom: 0.4rem;
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const PositionContainer = styled(Container.AlignMiddleContainer)`
  &:hover {
    .delete::before {
      cursor: pointer;
      visibility: visible;
    }
  }
`;

const Radio = styled(Form.Radio)`
  label {
    font-size: 0.9rem !important;
    margin-right: 0.5rem;
  }
`;

const AutoComplete = styled(Search)`
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
`;

const resultRenderer = ({ stack }) => <div>{stack}</div>;

const Write = () => {
  const dispatch = useDispatch();
  const { techstacks, loadTechstacksLoading } = useSelector((state) => state.techstack);
  const titleRef = createRef();
  const editorRef = createRef();
  const [title, onChangeTitle] = useInput('');
  const [content, setContent] = useState();
  const [position, setPosition] = useState([{ positionName: '서버/백엔드', total: 1 }]);
  const [purpose, setPurpose] = useState('');
  const [region, setRegion] = useState('지역 미지정');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [field, setField] = useState('');
  const [tech, onChangeTech, setTech] = useInput('');
  const [techlist, setTechlist] = useState([]);
  const [leaderPosition, setLeaderPosition] = useState('');
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      // 기존에 Image 를 Import 하는 Hook 을 제거한다.
      editorRef.current.getInstance().removeHook('addImageBlobHook');

      // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        (async () => {
          const formData = new FormData();
          formData.append('images', blob);

          const { data: filename } = await axios.post('/upload', formData, {
            headers: authHeader(),
          });

          callback(filename, '');
        })();
        return false;
      });
    }

    return () => {};
  }, [editorRef]);

  useEffect(() => {
    if (tech !== '') {
      dispatch({
        type: LOAD_TECHSTACK_REQUEST,
        name: tech,
      });
    }
  }, [tech]);

  const updatePosition = (index, value) => {
    const result = position.some((pos) => {
      if (pos.positionName === value) {
        alert('중복된 포지션은 선택할 수 없습니다.');
      }
      return pos.positionName === value;
    });
    if (!result) {
      const temp = [...position];
      temp[index] = { positionName: value, total: position[index].total };
      setPosition(temp);
    }
  };

  const updateNum = (index, num) => {
    const temp = [...position];
    temp[index] = { positionName: position[index].positionName, total: num };
    setPosition(temp);
  };

  const addPosition = () => {
    setPosition([...position, { positionName: null, total: null }]);
  };

  const deletePosition = (idx) => {
    setPosition(position.filter((value, index) => index !== idx));
  };

  const onChangeEditorTextHandler = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };

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

  const handleSubmit = () => {
    setProjectData({
      title,
      purpose,
      region,
      techStack: techlist,
      startDate: toStringByFormatting(startDate),
      endDate: toStringByFormatting(endDate),
      field,
      description: content,
      thumbnail: '',
      projectPositions: position,
      leaderPosition,
    });
  };

  return (
    <WriteContainer>
      <Container.RowStartContainer>
        <TitleIcon src="images/write/titleIcon.png" alt="titleIcon" />
        <Title
          placeholder="제목을 입력해주세요."
          onChange={onChangeTitle}
          value={title}
          ref={titleRef}
        />
      </Container.RowStartContainer>
      <Form onSubmit={handleSubmit} style={{ maxWidth: '1300px' }}>
        <InputContainer>
          <Container.ColumnStartContainer
            style={{
              paddingRight: '0.5rem',
              marginBottom: '2rem',
              borderRight: '1.5px solid #cecece',
            }}
          >
            <Field required>
              <Container.RowBetweenContainer>
                <Requiredlabel>모집인원</Requiredlabel>
                <div>
                  <Icon
                    name="plus"
                    color="grey"
                    style={{ cursor: 'pointer' }}
                    onClick={addPosition}
                  />
                  <Icon />
                </div>
              </Container.RowBetweenContainer>
              {position.map((pos, index) => {
                return (
                  <PositionContainer key={pos.id}>
                    <Select
                      placeholder="포지션 선택"
                      options={positionOption}
                      value={pos.positionName}
                      onChange={(e, { value }) => updatePosition(index, value)}
                    />
                    <NumSelect
                      compact
                      placeholder="-"
                      options={numOption}
                      value={pos.total}
                      onChange={(e, { value }) => updateNum(index, value)}
                    />
                    {index ? (
                      <Icon
                        name="delete"
                        color="grey"
                        onClick={() => deletePosition(index)}
                        style={{ visibility: 'hidden', opacity: 0.5 }}
                      />
                    ) : (
                      <Icon />
                    )}
                  </PositionContainer>
                );
              })}
            </Field>
            <Field required>
              <Requiredlabel>목적</Requiredlabel>
              <Form.Group inline>
                <Radio
                  label="공모전"
                  value="공모전"
                  checked={purpose === '공모전'}
                  onChange={(e, { value }) => setPurpose(value)}
                />
                <Radio
                  label="토이프로젝트"
                  value="토이프로젝트"
                  checked={purpose === '토이프로젝트'}
                  onChange={(e, { value }) => setPurpose(value)}
                />
                <Radio
                  label="창업"
                  value="창업"
                  checked={purpose === '창업'}
                  onChange={(e, { value }) => setPurpose(value)}
                />
              </Form.Group>
            </Field>
          </Container.ColumnStartContainer>
          <Container.ColumnStartContainer style={{ paddingLeft: '1.5rem' }}>
            <Container.RowStartContainer>
              <Container.ColumnStartContainer style={{ marginRight: '2.5rem' }}>
                <Field required>
                  <Requiredlabel>팀장 포지션</Requiredlabel>
                  <Select
                    placeholder="포지션 선택"
                    options={positionOption}
                    value={leaderPosition}
                    onChange={(e, { value }) => setLeaderPosition(value)}
                  />
                </Field>
              </Container.ColumnStartContainer>
              <Container.ColumnStartContainer>
                <Field required>
                  <Requiredlabel>프로젝트 기간</Requiredlabel>
                  <Container.AlignMiddleContainer>
                    <DatePicker
                      locale={ko}
                      dateFormat="yyyy년 MM월 dd일"
                      minDate={new Date()}
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        if (date > endDate) {
                          setEndDate(date);
                          alert('123');
                        }
                      }}
                      customInput={<Input />}
                    />
                    <div style={{ margin: '0 1rem' }}>~</div>
                    <DatePicker
                      locale={ko}
                      dateFormat="yyyy년 MM월 dd일"
                      minDate={startDate}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      customInput={<Input />}
                    />
                  </Container.AlignMiddleContainer>
                </Field>
              </Container.ColumnStartContainer>
            </Container.RowStartContainer>
            <Field required>
              <Requiredlabel>분야</Requiredlabel>
              <Grid stackable columns={5}>
                <Grid.Row>
                  {fields.map((f) => {
                    return (
                      <Grid.Column key={f.id} style={{ margin: '0.25rem 0' }}>
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
            </Field>
          </Container.ColumnStartContainer>
        </InputContainer>
        <Container.RowBetweenContainer>
          <Field>
            <InputLabel>기술스택 입력</InputLabel>
            <Container.AlignMiddleContainer>
              <AutoComplete
                placeholder="기술스택 검색"
                value={tech}
                onSearchChange={onChangeTech}
                results={techstacks}
                onResultSelect={handleResultSelect}
                loading={loadTechstacksLoading}
                resultRenderer={resultRenderer}
              />
            </Container.AlignMiddleContainer>
          </Field>
          <Field>
            <InputLabel>지역</InputLabel>
            <Select
              placehodler="지역선택"
              options={regionOption}
              value={region}
              onChange={(e, { value }) => setRegion(value)}
            />
          </Field>
        </Container.RowBetweenContainer>
        <Container.RowStartContainer style={{ margin: '-1rem 0 3rem 0' }}>
          {techlist.map((stack, index) => {
            return (
              <Tag key={stack}>
                {stack}
                <Icon name="delete" onClick={() => handleDeleteTag(index)} />
              </Tag>
            );
          })}
        </Container.RowStartContainer>
        <Requiredlabel>내용</Requiredlabel>
        <Editor
          height="80vh"
          previewStyle="vertical"
          placeholder="md형식으로 내용을 입력할 수 있습니다."
          initialEditType="markdown"
          ref={editorRef}
          autofocus={false}
          plugins={[colorSyntax, [codeSyntaxHighlight, { hightlighter: Prism }]]}
          onChange={onChangeEditorTextHandler}
        />
        <Container.AlignCenterContainer style={{ margin: '5rem 0' }}>
          <SubmitWrite data={projectData} />
        </Container.AlignCenterContainer>
      </Form>
    </WriteContainer>
  );
};

export default Write;
