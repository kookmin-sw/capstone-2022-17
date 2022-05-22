/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_IMAGE_REQUEST } from 'reducers/image';
import { Divider, Form, TextArea, Label, Icon, Search } from 'semantic-ui-react';
import styled from 'styled-components';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';
import useInput from 'hooks/useInput';
import { LOAD_TECHSTACK_REQUEST } from 'reducers/techstack';
import { LOAD_USER_REQUEST, UPDATE_USER_REQUEST } from 'reducers/user';
// import DataInput from 'components/Profile/DataInput';
// import NumInput from 'components/Profile/NumInput';

const ProfileContainer = styled(Container.ColumnMiddleContainer)`
  max-width: 1200px;
  width: 90vw;
  margin: 2rem 4rem;
`;

const IntroContainer = styled(Container.RowBetweenContainer)`
  width: 100%;
  padding: 0 3rem;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  font-family: 'Pr-Bold';
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Input = styled(Form.Input)`
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
  margin-bottom: 0 !important;
`;

const Intro = styled.div`
  font-size: 1rem;
`;

const IntroTextarea = styled(TextArea)`
  font-size: 0.9rem !important;
  font-family: 'Pr-Regular';
  resize: none !important;
  margin-top: 0.7rem !important ;
`;

const SNS = styled.img`
  width: 2rem;
  margin: 0 0.5rem;
  height: auto;
  opacity: 0.5;
`;

const SNSInput = styled(Input)`
  width: 7rem;
  .input > input {
    font-size: 0.85rem !important;
  }
  margin-right: 0.5rem !important;
`;

const PortfolioContainer = styled(Container.ColumnStartContainer)`
  width: 100%;
  padding: 0 3rem;
`;

const AutoComplete = styled(Search)`
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
  margin: 0.5rem 0.5rem 0 0 !important;
`;

const resultRenderer = ({ stack }) => <div>{stack}</div>;

// const InputLabel = styled.label`
//   font-size: 0.95rem;
//   font-family: 'Pr-SemiBold';
//   margin-bottom: 1rem !important;
// `;

// const LabelContainer = styled(Container.RowBetweenContainer)`
//   width: 100%;
//   align-items: baseline;
//   margin-top: 2rem;
// `;

// const AddBtn = styled(Btn.BasicPriBtn)`
//   padding: 0.25rem 1rem 0.25rem 0.8rem !important;
//   height: 1.8rem;
// `;

// const ItemBox = styled(Container.ColumnStartContainer)`
//   border: 1px solid #cecece;
//   border-radius: 0.5rem;
//   width: 100%;
//   padding: ${(props) => (props.edit ? '1rem' : '1rem 1.5rem')};
//   margin-bottom: 1rem;
// `;

// const Checkbox = styled(Form.Checkbox)`
//   label {
//     font-size: 0.9rem !important;
//     margin-right: 0.5rem;
//   }
// `;

// const Value = styled.div`
//   font-family: 'Pr-Regular';
//   font-size: 0.9rem;
//   width: 10rem;
// `;

// const tempEducation = [
//   { schoolName: '학교명11', major: '과이름11', grade: '3', isGraduate: false },
//   { schoolName: '학교명22', major: '과이름22', grade: null, isGraduate: true },
//   { schoolName: '학교명33', major: '과이름33', grade: '1', isGraduate: false },
// ];

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const { userData, loadUserDone, updateUserDone } = useSelector((state) => state.user);
  const { image, addImageDone } = useSelector((state) => state.image);
  const inputRef = useRef();

  const [imageUrl, setImageUrl] = useState('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [introduce, onChangeIntroduce, setIntroduce] = useInput('');
  const [github, onChangeGithub, setGithub] = useInput('');
  const [instaId, onChangeInstaId, setInstaId] = useInput('');

  const [techlist, setTechlist] = useState([]);
  const [tech, onChangeTech, setTech] = useInput('');
  const { techstacks, loadTechstacksLoading } = useSelector((state) => state.techstack);

  // const [education, setEducation] = useState(tempEducation);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      id,
    });
  }, []);

  const handleImageUpload = (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]);
    dispatch({
      type: ADD_IMAGE_REQUEST,
      data: formData,
    });
  };

  useEffect(() => {
    if (addImageDone) {
      setImageUrl(image);
    }
  }, [addImageDone]);

  const handleSubmit = () => {
    dispatch({
      type: UPDATE_USER_REQUEST,
      data: {
        avatar: imageUrl,
        nickname,
        introduce,
        github,
        instaId,
        userTechList: techlist,
      },
    });
    setEdit(false);
  };

  useEffect(() => {
    if (updateUserDone) {
      window.location.reload();
    }
  }, [updateUserDone]);

  const handleCancle = () => {
    setImageUrl(userData.avatar);
    setNickname(userData.nickname);
    setIntroduce(userData.introduce);
    setGithub(userData.github);
    setInstaId(userData.instaId);
    setTechlist(userData.userTechList);
    setEdit(false);
  };

  const handleResultSelect = (e, data) => {
    if (techlist.every((t) => t.userTech !== data.result.stack)) {
      setTechlist([...techlist, { userTech: data.result.stack }]);
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

  // const handleDeleteEduCation = (idx) => {
  //   setEducation(education.filter((value, index) => index !== idx));
  // };

  useEffect(() => {
    if (loadUserDone) {
      setImageUrl(userData.avatar);
      setNickname(userData.nickname);
      setIntroduce(userData.introduce);
      setGithub(userData.github);
      setInstaId(userData.instaId);
      setTechlist(userData.userTechList);
    }
  }, [loadUserDone]);

  return (
    <ProfileContainer>
      {loadUserDone && (
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <IntroContainer>
            <Container.AlignMiddleContainer>
              <Container.ColumnMiddleContainer style={{ margin: '0 4rem -2rem 0' }}>
                <ImgContainer>
                  <Img src={imageUrl || `${process.env.PUBLIC_URL}/images/missing.png`} />
                </ImgContainer>
                <Btn.BasicBtn
                  onClick={() => inputRef.current.click()}
                  style={!edit ? { visibility: 'hidden' } : null}
                  type="button"
                >
                  이미지 변경
                </Btn.BasicBtn>

                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Container.ColumnMiddleContainer>
              <Container.ColumnStartContainer>
                {!edit ? (
                  <>
                    <Name>{nickname}</Name>
                    <Intro>{introduce}</Intro>
                  </>
                ) : (
                  <div style={{ minWidth: '20rem' }}>
                    <Input value={nickname} onChange={onChangeNickname} placeholder="닉네임 입력" />
                    <IntroTextarea
                      value={introduce}
                      onChange={onChangeIntroduce}
                      placeholder="자기소개 입력"
                    />
                  </div>
                )}
              </Container.ColumnStartContainer>
            </Container.AlignMiddleContainer>
            <Container.ColumnBetweenContainer style={{ padding: '1rem 0' }}>
              <div style={user.id != id ? { visibility: 'hidden' } : null}>
                {!edit ? (
                  <Btn.BasicBtn onClick={() => setEdit(true)}>수정</Btn.BasicBtn>
                ) : (
                  <div>
                    <Btn.PrimaryBtn type="submit" style={{ marginRight: '0.5rem' }}>
                      완료
                    </Btn.PrimaryBtn>
                    <Btn.SubBtn type="button" onClick={handleCancle}>
                      취소
                    </Btn.SubBtn>
                  </div>
                )}
              </div>
              <Container.RowStartContainer>
                {(userData.github || edit) && (
                  <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
                    <SNS src={`${process.env.PUBLIC_URL}/images/profile/github.png`} />
                  </a>
                )}
                {edit && (
                  <SNSInput value={github} onChange={onChangeGithub} placeholder="Github Id" />
                )}
                {(userData.instaId || edit) && (
                  <a href={`https://www.instagram.com/${instaId}`} target="_blank" rel="noreferrer">
                    <SNS src={`${process.env.PUBLIC_URL}/images/profile/insta.png`} />
                  </a>
                )}
                {edit && (
                  <SNSInput
                    value={instaId}
                    onChange={onChangeInstaId}
                    placeholder="Instargram Id"
                  />
                )}
              </Container.RowStartContainer>
            </Container.ColumnBetweenContainer>
          </IntroContainer>
          <Divider style={{ width: '100%' }} />
          <PortfolioContainer style={edit ? { marginTop: '3.5rem' } : null}>
            {edit && (
              <AutoComplete
                placeholder="기술스택 추가"
                value={tech}
                onSearchChange={onChangeTech}
                results={techstacks}
                onResultSelect={handleResultSelect}
                loading={loadTechstacksLoading}
                resultRenderer={resultRenderer}
              />
            )}
            <Container.RowStartContainer
              style={{ margin: '0.5rem 0 3rem -0.2rem', flexWrap: 'wrap' }}
            >
              {techlist.map((stack, index) => {
                return (
                  <Tag key={stack.userTech}>
                    {stack.userTech}
                    {edit && <Icon name="delete" onClick={() => handleDeleteTag(index)} />}
                  </Tag>
                );
              })}
            </Container.RowStartContainer>
            {edit && <Btn.PrimaryBtn type="button">포지션 추가하러 가기</Btn.PrimaryBtn>}
            {/* {education.map((edu, index) => {
            if (edit) {
              return (
                <ItemBox key={edu.schoolName} edit={edit}>
                <Container.RowBetweenContainer style={{ width: '100%', alignItems: 'center' }}>
                <Container.AlignMiddleContainer>
                <DataInput placeholder="학교명" value={edu.schoolName} />
                <DataInput placeholder="학과명" value={edu.major} />
                <NumInput value={edu.grade || '0'} disabled={edu.isGraduate} />
                      <div style={{ marginRight: '2rem' }}>학년</div>
                      <Checkbox
                      checked={edu.isGraduate}
                      onChange={() => {
                        const temp = [...education];
                        temp[index].isGraduate = !temp[index].isGraduate;
                        setEducation(temp);
                      }}
                      label="졸업여부"
                      />
                      </Container.AlignMiddleContainer>
                      <Icon
                      name="delete"
                      color="grey"
                      style={{ opacity: '0.5', cursor: 'pointer' }}
                      onClick={() => handleDeleteEduCation(index)}
                      />
                  </Container.RowBetweenContainer>
                  </ItemBox>
              );
            }
            return (
              <ItemBox key={edu.schoolName} edit={edit}>
              <Container.AlignMiddleContainer>
              <Value>{edu.schoolName}</Value>
              <Value>{edu.major}</Value>
              {edu.isGraduate ? <Value>졸업</Value> : <Value>{edu.grade}학년</Value>}
              </Container.AlignMiddleContainer>
              </ItemBox>
              );
            })}
            
          <LabelContainer>
            <InputLabel>경력</InputLabel>
            {edit && <AddBtn type="button">+ 추가</AddBtn>}
          </LabelContainer> */}
          </PortfolioContainer>
        </Form>
      )}
    </ProfileContainer>
  );
};

export default Profile;
