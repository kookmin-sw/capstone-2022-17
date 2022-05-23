import React from 'react';
import styled from 'styled-components';
import { Icon, Dropdown } from 'semantic-ui-react';

// const NotiContainer = styled.div`
//   display: inline-block;
//   outline: 0;
//   text-align: left;
//   position: relative;
//   transition: box-shadow 0.1s ease, width 0.1s ease, -webkit-box-shadow 0.1s ease;
// `;

const Noti = styled(Icon)`
  font-size: 1.2rem !important;
  margin-left: 2rem !important;
  opacity: 0.5 !important;
  cursor: pointer;
`;

const trigger = (
  <span>
    <Noti name="alarm" />
  </span>
);

// const NotiView = styled.div`
//   position: absolute;
//   width: 20rem;
//   height: 10rem;
//   background: white;
//   border-radius: 0.3rem;
//   border: 1px solid rgba(34, 36, 38, 0.15);
//   left: -400%;
//   top: 100%;
//   margin-top: 1.5rem;
//   cursor: auto;
//   outline: 0;
//   z-index: 11;
//   box-shadow: 0 2px 3px 0 rgb(34 36 38 / 15%);
//   transition: opacity 0.1s ease;
//   will-change: transform, opacity;
//   overflow-y: auto;
//   &::-webkit-scrollbar {
//     width: 6px;
//   }

//   &::-webkit-scrollbar-thumb {
//     border-radius: 6px;
//   }

//   &::-webkit-scrollbar-track {
//     border-radius: 6px;
//   }
// `;

const NotiIcon = () => {
  return (
    <Dropdown direction="left" trigger={trigger}>
      <Dropdown.Menu>asdf</Dropdown.Menu>
    </Dropdown>
  );
};

export default NotiIcon;
