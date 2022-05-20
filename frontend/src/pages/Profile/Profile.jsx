import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_IMAGE_REQUEST } from 'reducers/image';

import styled from 'styled-components';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';

const ProfileContainer = styled(Container.ColumnMiddleContainer)`
  max-width: 1200px;
  width: 90vw;
  margin: 2rem 4rem;
`;

const IntroContainer = styled(Container.RowBetweenContainer)`
  width: 100%;
  padding: 0 4rem 0 3rem;
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

const Intro = styled.div`
  font-size: 1rem;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { image, addImageDone } = useSelector((state) => state.image);
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);

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

  return (
    <ProfileContainer>
      <IntroContainer>
        <Container.AlignMiddleContainer>
          <Container.ColumnMiddleContainer style={{ margin: '0 4rem -2rem 0' }}>
            <ImgContainer>
              <Img src={imageUrl || `${process.env.PUBLIC_URL}/images/missing.png`} />
            </ImgContainer>
            <Btn.BasicBtn
              onClick={() => inputRef.current.click()}
              style={!edit ? { visibility: 'hidden' } : null}
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
            <Name>김민정</Name>
            <Intro>자기소개자기소개자기소개자기소개쇅</Intro>
          </Container.ColumnStartContainer>
        </Container.AlignMiddleContainer>
        <Container.ColumnBetweenContainer style={{ padding: '1rem 0' }}>
          {!edit ? (
            <Btn.BasicBtn onClick={() => setEdit(true)}>수정</Btn.BasicBtn>
          ) : (
            <div>
              <Btn.PrimaryBtn style={{ marginRight: '0.5rem' }}>완료</Btn.PrimaryBtn>
              <Btn.SubBtn onClick={() => setEdit(false)}>취소</Btn.SubBtn>
            </div>
          )}
        </Container.ColumnBetweenContainer>
      </IntroContainer>
    </ProfileContainer>
  );
};

export default Profile;
