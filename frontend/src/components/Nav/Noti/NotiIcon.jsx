import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon, Dropdown, Divider } from 'semantic-ui-react';
import { CHECK_NOTIFY_MEMBER_REQUEST, NOTIFY_MEMBER_REQUEST } from 'reducers/member';
import * as Container from 'components/common/Containers';
import COLOR from 'constant/color';

const Noti = styled(Icon)`
  font-size: 1.4rem !important;
  margin-left: 2rem !important;
  opacity: 0.5 !important;
`;

const trigger = (
  <span>
    <Noti name="alarm" />
  </span>
);

const badgetrigger = (
  <span>
    <Icon.Group style={{ margin: '0 0.55rem 0 0.2rem' }}>
      <Noti name="alarm" style={{ margin: '0 -0.1rem 0 0' }} />
      <Icon
        corner="top right"
        name="circle"
        color="red"
        style={{ textShadow: 'none', fontSize: '0.2rem !important' }}
      />
    </Icon.Group>
  </span>
);

const NotiView = styled(Container.ColumnStartContainer)`
  width: 15rem;
  max-height: 15rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 6px;
  }
`;

const NotiItem = styled(Container.RowBetweenContainer)`
  align-items: center;
  padding: 1rem 0.5rem 1rem 1rem;
  cursor: ${(props) => !props.none && 'pointer'};
  width: 100%;
  background: white;

  &:hover {
    background: ${(props) => !props.none && 'rgba(0, 0, 0, 0.05)'};
  }
`;

const Title = styled.div`
  font-family: 'Pr-SemiBold';
  margin-right: 0.1rem;
`;

const Position = styled(Title)`
  color: ${COLOR.PRIMARY};
`;

const NotiIcon = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch({
      type: NOTIFY_MEMBER_REQUEST,
    });
  }, [location.pathname]);

  const handleCheckNoti = (e, id) => {
    e.stopPropagation();
    dispatch({
      type: CHECK_NOTIFY_MEMBER_REQUEST,
      data: {
        id,
      },
    });
  };

  return (
    <Dropdown
      direction="left"
      trigger={notify?.some((noti) => !noti.checked) ? badgetrigger : trigger}
      icon={null}
    >
      <Dropdown.Menu style={{ marginTop: '1rem' }}>
        <NotiView>
          {notify?.some((noti) => !noti.checked) ? (
            notify?.map((noti, index) => {
              return (
                <>
                  <NotiItem onClick={() => navigate(`/project/${noti.projectId}`)}>
                    <Container.ColumnStartContainer>
                      <Container.RowStartContainer style={{ marginBottom: '0.2rem' }}>
                        <Title>{noti.projectName}</Title>에서 당신을
                      </Container.RowStartContainer>
                      <Container.RowStartContainer>
                        <Position>{noti.positionName}</Position>로 초대했습니다.
                      </Container.RowStartContainer>
                    </Container.ColumnStartContainer>
                    <Icon name="delete" color="grey" onClick={(e) => handleCheckNoti(e, noti.id)} />
                  </NotiItem>
                  {index !== notify.length - 1 && (
                    <Divider style={{ width: '100%', margin: ' 0' }} />
                  )}
                </>
              );
            })
          ) : (
            <NotiItem none>새로운 알림이 없습니다.</NotiItem>
          )}
        </NotiView>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotiIcon;
