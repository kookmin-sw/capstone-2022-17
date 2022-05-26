import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Modal, Icon, Radio, Label } from 'semantic-ui-react';
import * as Btn from 'components/common/Btn';
import * as Container from 'components/common/Containers';
import media from 'utils/media';
import { ADD_MEMBER_REQUEST } from 'reducers/member';

const Trigger = styled(Btn.PrimaryBtn)`
  width: 5rem;
`;

const ModalContainer = styled(Modal)`
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

const InviteBtn = ({ project, user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selected, setSelected] = useState('');
  const { addMemberDone } = useSelector((state) => state.member);

  const handleOpen = () => {
    setOpen(true);
    setPositions(project.projectPositions);
  };

  const handleSubmit = () => {
    dispatch({
      type: ADD_MEMBER_REQUEST,
      data: {
        positionName: selected,
        projectId: project.id,
        userId: user.id,
      },
    });
  };

  useEffect(() => {
    if (addMemberDone) {
      window.location.reload();
    }
  }, [addMemberDone]);

  return (
    <ModalContainer
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      trigger={<Trigger>초대</Trigger>}
    >
      <ModalHeader>
        <div />
        <ModalTitle>초대하기</ModalTitle>
        <Icon
          onClick={() => setOpen(false)}
          name="remove"
          style={{ cursor: 'pointer', opacity: '0.5' }}
        />
      </ModalHeader>
      <Modal.Content style={{ padding: '2rem' }}>
        <Container.ColumnMiddleContainer style={{ width: '100%' }}>
          <Text>어떤 포지션으로 초대할까요?</Text>
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
          <Btn.PrimaryBtn onClick={handleSubmit}>이 포지션으로 초대하기</Btn.PrimaryBtn>
        </Container.ColumnMiddleContainer>
      </Modal.Content>
    </ModalContainer>
  );
};

export default InviteBtn;
