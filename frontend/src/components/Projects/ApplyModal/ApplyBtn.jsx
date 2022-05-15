import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'utils/media';
import { Modal, Icon } from 'semantic-ui-react';
import * as Btn from 'components/common/Btn';

const SupplyBtn = styled(Btn.PrimaryBtn)`
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

const ApplyBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <ApplyModal
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={<SupplyBtn fluid>지원하기</SupplyBtn>}
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
      <Modal.Content>내용</Modal.Content>
    </ApplyModal>
  );
};

export default ApplyBtn;
