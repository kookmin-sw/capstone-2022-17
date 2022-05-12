import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Noti = styled(Icon)`
  margin-left: 2rem !important;
  opacity: 0.5 !important;
  cursor: pointer;
`;

const NotiIcon = () => {
  return <Noti name="alarm" size="large" />;
};

export default NotiIcon;
