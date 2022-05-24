import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import media from 'utils/media';
import { Modal, Icon, Radio, Label } from 'semantic-ui-react';
import * as Btn from 'components/common/Btn';
import * as Container from 'components/common/Containers';
import {
  ADD_MEMBER_REQUEST,
  APPROVE_MEMBER_REQUEST,
  DESTROY_MEMBER_REQUEST,
  REJECT_MEMBER_REQUEST,
} from 'reducers/member';

const SupplyBtn = styled(Btn.PrimaryBtn)`
  font-size: 0.9rem !important;
  border-radius: 3rem !important;
  height: 2.2rem !important;
  margin-top: 0.5rem !important;
  cursor: pointer;
`;

const RejectBtn = styled(Btn.SubBtn)`
  font-size: 0.9rem !important;
  border-radius: 3rem !important;
  height: 2.2rem !important;
  margin-top: 0.5rem !important;
  cursor: pointer;
`;

const ApplyModal = styled(Modal)`
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
  padding: 1.3rem 1rem;
  border-bottom: 1px solid #d6d6d6;
`;

const ModalTitle = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.1rem;
`;

const Text = styled.div`
  font-family: 'Pr-Light';
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const ApplyBtn = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addMemberDone, destroyMemberDone } = useSelector((state) => state.member);
  const { user } = useSelector((state) => state.authentication);
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setPositions(project.projectPositions);
  };

  const handleSubmit = () => {
    switch (project.memberType) {
      case 'CANDIDATE':
        if (window.confirm('정말 지원을 취소하시겠습니까?')) {
          dispatch({
            type: DESTROY_MEMBER_REQUEST,
            id: project.id,
          });
        }
        break;
      case 'LEADER':
        navigate(`/project/setting/${project.id}`);
        break;
      case 'MEMBER':
        if (window.confirm('정말 프로젝트를 나가시겠습니까?')) {
          dispatch({
            type: DESTROY_MEMBER_REQUEST,
            id: project.id,
          });
        }
        break;
      default:
        dispatch({
          type: ADD_MEMBER_REQUEST,
          data: { positionName: selected, projectId: project.id },
        });
        break;
    }
  };

  const handleApprove = () => {
    dispatch({
      type: APPROVE_MEMBER_REQUEST,
      data: {
        projectId: project.id,
        userId: user.user.id,
      },
    });
  };

  const handleReject = () => {
    dispatch({
      type: REJECT_MEMBER_REQUEST,
      data: {
        projectId: project.id,
        userId: user.user.id,
      },
    });
  };

  useEffect(() => {
    if (addMemberDone) {
      window.location.reload();
    }
  }, [addMemberDone]);

  useEffect(() => {
    if (destroyMemberDone) {
      window.location.reload();
    }
  }, [destroyMemberDone]);

  useEffect(() => {
    switch (project.memberType) {
      case 'REJECT':
        setText('프로젝트에 참여할 수 없습니다.');
        break;
      case 'CANDIDATE':
        setText('지원 취소하기');
        break;
      case 'INVITED':
        setText('초대');
        break;
      case 'LEADER':
        setText('관리페이지 이동');
        break;
      case 'MEMBER':
        setText('프로젝트 나가기');
        break;
      default:
        setText('지원하기');
        break;
    }
  }, [project]);

  switch (project.memberType) {
    case 'REJECT':
      return (
        <Btn.DisableBtn fluid disabled>
          {text}
        </Btn.DisableBtn>
      );
    case 'CANDIDATE':
      return (
        <SupplyBtn onClick={handleSubmit} fluid>
          {text}
        </SupplyBtn>
      );
    case 'LEADER':
      return (
        <SupplyBtn onClick={handleSubmit} fluid>
          {text}
        </SupplyBtn>
      );
    case 'INVITED':
      return (
        <Container.RowBetweenContainer>
          <RejectBtn fluid onClick={handleReject}>
            초대 거절
          </RejectBtn>
          <SupplyBtn fluid onClick={handleApprove}>
            초대 승인
          </SupplyBtn>
        </Container.RowBetweenContainer>
      );
    case 'MEMBER':
      return (
        <SupplyBtn onClick={handleSubmit} fluid>
          {text}
        </SupplyBtn>
      );
    default:
      return (
        <ApplyModal
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          trigger={<SupplyBtn fluid>{text}</SupplyBtn>}
        >
          <ModalHeader>
            <div />
            <ModalTitle>지원하기</ModalTitle>
            <Icon
              onClick={() => setOpen(false)}
              name="remove"
              style={{ cursor: 'pointer', opacity: '0.5' }}
            />
          </ModalHeader>
          <Modal.Content style={{ padding: '2rem' }}>
            <Container.ColumnMiddleContainer style={{ width: '100%' }}>
              <Text>어떤 포지션으로 지원할까요?</Text>
              <Container.ColumnStartContainer style={{ marginBottom: '1rem' }}>
                {positions.map((pos) => {
                  if (pos.currentCnt < pos.total)
                    return (
                      <Container.AlignMiddleContainer style={{ marginBottom: '1rem' }}>
                        <Radio
                          key={pos.positionName}
                          label={pos.positionName}
                          value={pos.positionName}
                          checked={selected === pos.positionName}
                          onChange={(e, { value }) => setSelected(value)}
                        />
                        <Label style={{ padding: '0.4rem 0.6rem', marginLeft: '1rem' }}>
                          {pos.currentCnt} / {pos.total}
                        </Label>
                      </Container.AlignMiddleContainer>
                    );
                  return <div />;
                })}
              </Container.ColumnStartContainer>
              <Btn.PrimaryBtn onClick={handleSubmit}>이 포지션으로 지원하기</Btn.PrimaryBtn>
            </Container.ColumnMiddleContainer>
          </Modal.Content>
        </ApplyModal>
      );
  }
};

export default ApplyBtn;
