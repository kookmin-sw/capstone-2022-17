import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
import Title from 'components/Projects/Title';
import WrittenDate from 'components/Projects/WrittenDate';
import Leader from 'components/Projects/Leader';
import Likes from 'components/common/Likes';
import Views from 'components/Projects/Views';
import Content from 'components/Projects/Content';
import FloatingBox from 'components/FloatingBox/FloatingBox';

const Container = styled.div`
  /* background-color: green; */
  display: flex;
  /* max-width: 1320px; */
  min-width: 600px;
  margin: 0 auto 5rem auto;

  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) {
    width: 850px;
  }

  /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 700px;
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
  }
`;

const ContentsBox = styled.div`
  /* background-color: #9b7db7; */
  margin-right: 1rem;
  width: 70%;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  /* background-color: pink; */
  justify-content: space-between;
  margin: 1rem 0;
`;

const TagBox = styled.div`
  margin: 0.5rem 0;
  /* background-color: purple; */
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  /* background-color: gray; */
  border-bottom: 0.7px solid #adadad;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const IconBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  /* background-color: gold; */
`;

const Project = () => {
  return (
    <Container>
      <ContentsBox>
        <TitleBox>
          <Title>이건 프로젝트 제목입니다.</Title>
          <WrittenDate>2022-00-00</WrittenDate>
        </TitleBox>
        <TagBox>
          <Tag>프론트엔드</Tag>
          <Tag>프론트엔드</Tag>
        </TagBox>
        <InfoBox>
          <Leader>송경석</Leader>
          <IconBox>
            <Likes>52</Likes>
            <Views>100</Views>
          </IconBox>
        </InfoBox>
        <Content>
          Ooh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고 쫓는 이런
          놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh 눈동자
          아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so bad) its
          good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를 비춘 밤
          아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh, ooh-ooh,
          lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect
          sacrifice Yeah 숨 참고 love dive Ooh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh,
          ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면
          알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh
          Yeah, its so bad (its so bad) its good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my
          god, I love it 서로를 비춘 밤 아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨
          참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive
          Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고 love dive Ooh, ooh, yeah 네가 참
          궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는
          이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh,
          ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so bad) its good (its good)
          난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를 비춘 밤 아름다운 까만 눈빛
          더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala
          Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고
          love dive Ooh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고
          쫓는 이런 놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh
          눈동자 아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so
          bad) its good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를
          비춘 밤 아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh,
          ooh-ooh, lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect
          sacrifice Yeah 숨 참고 love diveOoh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh,
          ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면
          알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh
          Yeah, its so bad (its so bad) its good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my
          god, I love it 서로를 비춘 밤 아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨
          참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive
          Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고 love dive Ooh, ooh, yeah 네가 참
          궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는
          이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh,
          ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so bad) its good (its good)
          난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를 비춘 밤 아름다운 까만 눈빛
          더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala
          Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고
          love dive Ooh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고
          쫓는 이런 놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh
          눈동자 아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so
          bad) its good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를
          비춘 밤 아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh,
          ooh-ooh, lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect
          sacrifice Yeah 숨 참고 love dive Ooh, ooh, yeah 네가 참 궁금해 그건 너도 마찬가지 (ooh,
          ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는 이끌림과 호기심 묘한 너와 나 두고 보면
          알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh, ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh
          Yeah, its so bad (its so bad) its good (its good) 난 그 맘을 좀 봐야겠어 Narcissistic, my
          god, I love it 서로를 비춘 밤 아름다운 까만 눈빛 더 빠져 깊이 (넌 내게로, 난 네게로) 숨
          참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala Ooh-ooh, ooh-ooh 어서 와서 love dive
          Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고 love dive Ooh, ooh, yeah 네가 참
          궁금해 그건 너도 마찬가지 (ooh, ooh) 이거면 충분해 쫓고 쫓는 이런 놀이 참을 수 없는
          이끌림과 호기심 묘한 너와 나 두고 보면 알겠지 Ooh-ooh, ooh-ooh 눈동자 아래로 Ooh-ooh,
          ooh-ooh 감추고 있는 거 Ooh-ooh, ooh-ooh Yeah, its so bad (its so bad) its good (its good)
          난 그 맘을 좀 봐야겠어 Narcissistic, my god, I love it 서로를 비춘 밤 아름다운 까만 눈빛
          더 빠져 깊이 (넌 내게로, 난 네게로) 숨 참고 love dive Ooh-ooh, ooh-ooh, lalalalalalala
          Ooh-ooh, ooh-ooh 어서 와서 love dive Ooh-ooh, ooh-ooh, oh, perfect sacrifice Yeah 숨 참고
          love dive
        </Content>
      </ContentsBox>
      <FloatingBox />
    </Container>
  );
};

export default Project;
