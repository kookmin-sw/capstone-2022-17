import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import { lighten } from 'polished';
import { Viewer } from '@toast-ui/react-editor';
import './toastui-editor.css';

import Term from './Term';

export const Label = styled.span`
  cursor: pointer;
  font-family: 'Pr-Medium' !important;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.primary};

  &:hover {
    color: ${lighten(0.1, '#797FD4')};
  }
`;

function ServiceModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Label>서비스 이용약관</Label>}
    >
      <Modal.Header style={{ fontFamily: 'NS-EB' }}>서비스 이용약관</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Viewer initialValue={Term} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Label onClick={() => setOpen(false)}>확인</Label>
      </Modal.Actions>
    </Modal>
  );
}

export default ServiceModal;
