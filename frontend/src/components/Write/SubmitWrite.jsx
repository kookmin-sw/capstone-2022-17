import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import media from 'utils/media';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';
import COLOR from 'constant/color';
import { ADD_IMAGE_REQUEST } from 'reducers/image';
import { ADD_PROJECT_REQUEST } from 'reducers/project';

const SubmitBtn = styled(Btn.PrimaryBtn)`
  height: 2.5rem;
  width: 8rem;
  font-size: 1rem !important;
`;

const SubmitModal = styled(Modal)`
  max-width: 35rem;
  ${media.tablet`
      max-width: 60%;
      min-width: 60%;
    `};
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2rem;
  border-bottom: 1px solid #d6d6d6;
`;

const ModalTitle = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.1rem;
`;

const BtnText = styled.div`
  font-family: 'Pr-Regular';
  color: ${COLOR.LIGHTGRAY};
  cursor: pointer;
`;

const ImgContainer = styled.img`
  width: 23rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

const BasicImg = styled.img`
  width: 12rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin: 0.3rem;
  cursor: pointer;
`;

const SubmitWrite = ({ data }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const { image, addImageDone } = useSelector((state) => state.image);
  const [imageUrl, setImageUrl] = useState(
    `${process.env.PUBLIC_URL}/images/write/placeholder.png`,
  );
  const [mode, setMode] = useState(false);

  const handleImageUpload = (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]);
    dispatch({
      type: ADD_IMAGE_REQUEST,
      data: formData,
    });
  };

  const handleBasicImg = (e) => {
    setImageUrl(e.target.src);
    setMode(false);
  };

  const handleSubmit = () => {
    data.thumbnail = imageUrl;
    dispatch({
      type: ADD_PROJECT_REQUEST,
      data,
    });
  };

  useEffect(() => {
    if (addImageDone) {
      setImageUrl(image);
    }
  }, [addImageDone]);

  const handleClose = () => {
    setOpen(false);
    setMode(false);
  };

  return (
    <SubmitModal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<SubmitBtn>작성완료</SubmitBtn>}
    >
      <ModalHeader>
        <BtnText onClick={handleClose}>취소</BtnText>
        <ModalTitle>대표 이미지 등록</ModalTitle>
        <BtnText onClick={handleSubmit} style={{ color: COLOR.PRIMARY }}>
          완료
        </BtnText>
      </ModalHeader>
      <Modal.Content>
        {mode ? (
          <Container.ColumnMiddleContainer>
            <Container.AlignCenterContainer>
              <BasicImg
                onClick={handleBasicImg}
                src={`${process.env.PUBLIC_URL}/images/card/cardImg1.png`}
              />
              <BasicImg
                onClick={handleBasicImg}
                src={`${process.env.PUBLIC_URL}/images/card/cardImg2.png`}
              />
            </Container.AlignCenterContainer>
            <Container.AlignCenterContainer>
              <BasicImg
                onClick={handleBasicImg}
                src={`${process.env.PUBLIC_URL}/images/card/cardImg3.png`}
              />
              <BasicImg
                onClick={handleBasicImg}
                src={`${process.env.PUBLIC_URL}/images/card/cardImg4.png`}
              />
            </Container.AlignCenterContainer>
          </Container.ColumnMiddleContainer>
        ) : (
          <Container.ColumnMiddleContainer>
            <ImgContainer src={imageUrl} />
            <Container.RowBetweenContainer>
              <Btn.PrimaryBtn
                onClick={() => inputRef.current.click()}
                style={{ width: '8.5rem', margin: '0 0.3rem' }}
              >
                이미지 업로드
              </Btn.PrimaryBtn>

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <Btn.SubBtn
                onClick={() => setMode(true)}
                style={{ width: '8.5rem', margin: '0 0.3rem' }}
              >
                기본이미지 선택
              </Btn.SubBtn>
            </Container.RowBetweenContainer>
          </Container.ColumnMiddleContainer>
        )}
      </Modal.Content>
    </SubmitModal>
  );
};

export default SubmitWrite;
