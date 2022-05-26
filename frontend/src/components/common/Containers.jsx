import styled from 'styled-components';

export const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const AlignMiddleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RowStartContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const RowEndContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const RowBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColumnStartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ColumnBetweenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
export const ColumnMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
