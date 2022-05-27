[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7042943&assignment_repo_type=AssignmentRepo)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9b911240-94de-4aea-bb7f-5e32b4206f26/deploy-status)](https://app.netlify.com/sites/teaming/deploys)

# 티밍 (Teamming)

> 2022년 17조 https://github.com/kookmin-sw/capstone-2022-17

> Github page : https://kookmin-sw.github.io/capstone-2022-17/

<br/>

## 💬 프로젝트 소개
>"프로젝트 해야 되는데.. 좋은 팀원을 어디서 구하지?”

개발자에 대한 수요가 늘어나면서, 개발자가 되고자 하는 사람들이 많아졌다. 포트폴리오를 채우고, 개발 실력을 향상시키기 위해 자연스레 팀 프로젝트는 필수 요소가 되었다.
그러나, 팀원을 어디서 구해야 할지, 어떻게 구해야 할지 몰라서 방황하는 사람들이 많다.

혹은 팀원을 구했으나 관심 분야나 실력의 차이로 팀이 와해되기도 한다.
이러한 문제점을 해결하기 위해, 우리는 프로젝트 매칭 서비스인 “Teaming”을 기획했다.
티밍을 통해 사용자들이 좀 더 효율적이고 완성도 높은 프로젝트 경험을 얻어갔으면 하는 바람이다.

<br/>

### Abstract

Increasing needs for developer, many people want to become a developer.
To fill their resume and enhance development skills, the experience worked for team projects is necessary today.
However, many people wander about where they can find and how to recruit teammates.
Even they finally find teammates, team often disbands for difference of the level or tech-stacks.
To solve those discomforts, we invented project matching service "Teamming".
We wish that developers can have efficient matchings and satisfying project experiences.

<br/>

### 📋 주요 기능 소개
* 누구나 프로젝트를 생성할 수 있고 참여할 수 있습니다.
* 회원 가입시 받은 데이터를 바탕으로 프로젝트를 추천 받을 수 있습니다.
* 프로젝트를 생성하고 나면 자신이 올린 프로젝트 기술 스택에 맞는 팀원을 추천 받을 수 있습니다.
* 개설 된 프로젝트를 검색 조건에 따라 필터링 하여 둘러볼 수 있습니다.
* 좋아요 기능이 있으며 내 프로젝트 페이지에서 좋아요 한 프로젝트, 진행중인 프로젝트, 완료된 프로젝트를 모아볼 수 있습니다.
### 💻 시스템 구성도
<img src="https://user-images.githubusercontent.com/71240296/170535469-2c0709b5-1bd0-4377-9678-c70ac85c366f.png" width="600"/>

### 🚢 기대효과
1️⃣ 자신에게 맞는 프로젝트 추천

2️⃣ 신뢰할 수 있는 팀원 추천

3️⃣ 프로젝트와 팀원을 찾는 시간 단축


## 📹 소개 영상 

[![티밍 시연 영상](http://img.youtube.com/vi/JqZ5rZ_jD8M/0.jpg)](https://www.youtube.com/watch?v=JqZ5rZ_jD8M?t=0s)

(시연 영상 유튜브 링크 입니다.)
<br/>

## 👋 팀 소개 

> 팀장 송경석

<img src="https://user-images.githubusercontent.com/74754782/159710144-84e93d9e-60b1-470e-82f0-93335dbbf1aa.jpg"  width="230"/>

- 학번: \*\*\*\*0028
- E-mail: skj0922@kookmin.ac.kr
- 역할: 서버 개발, 데이터베이스 구축

<br/>

> 구예진

<img src="https://user-images.githubusercontent.com/74754782/159710628-9f98ceb2-7feb-4c58-ad5e-f6bb2b95bd2c.jpg"  width="230"/>

- 학번: \*\*\*\*2004
- E-mail: kyejin0412@kookmin.ac.kr
- 역할: 프론트엔드 개발

<br/>

> 김민정

<img src="https://user-images.githubusercontent.com/74754782/159710445-c1cec3cb-810b-429f-b549-05b48fc120b1.jpg"  width="230"/>

- 학번: \*\*\*\*1556
- E-mail: minjj0905@kookmin.ac.kr
- 역할: 프론트엔드 개발 및 배포

<br/>

> 박건우

- 학번: \*\*\*\*2817
- E-mail: scv74502@kookmin.ac.kr
- 역할: 추천 시스템 개발

<br/>

## ✏️ 사용법 ️
### 1. 프론트엔드
1. Git repository를 clone 하여 받아온다. 

2. frontend 브렌치로 checkout 하고 yarn을 이용하여 패키지를 다운로드한다.
```
git checkout front/develop
yarn install
```
3. 윈도우 환경은 start로, linux환경은 starts로 실행한다.
```
yarn start or yarn starts
```
<br/>

### 2. 백엔드
1. backend 브렌치로 checkout 한다.
```
git checkout back/develop
```
2. 자바 버전을 확인하고 sudo apt install openjdk-11-jre-headless 명령어로 자바 11버전을 설치한다.
```
java -version
sudo apt install openjdk-11-jre-headless
```

3. gradlew 파일이 있는 디렉토리로 이동하고 다음 명령어를 통해 jar파일을 생성한다.
```
cd capstone-2022-17/backend/
./gradlew build
```

4. 빌드된 jar 파일을 실행 시킨다. 이때 환경 변수로 DB커넥션 정보와 비밀번호, 계정명, JWT secret key를 주입받는다.
```
nohup java -jar backend-0.0.1-SNAPSHOT.jar –DB_URL=“DB 커넥션 정보” –DB_PASSWORD=”DB 비밀번호” –DB__USER=”admin” –JWT_SECRET=”jwt secret key”
```

### 3. 추천 시스템 API
1. ec2 우분투 인스턴스에서 apt을 업데이트하여 패키지를 최신 정보로 갱신한다.
```
sudo apt-get update
```
2. recommend 폴더로 이동한디 python3와 pip3를 설치한다.
```
sudo apt install python3
sudo install python-pip3
```
3. 다음 명령어로 파이썬 패키지들을 설치한다
```
pip install -r requirement.txt
```
4. nginx를 설치하고 fastapi-demo를 설정하여 다음과 같은 내용을 설정한다.
```
sudo apt install nginx
sudo vi /etc/nginx/sites-enabled/fastapi-demo
```
<img src="https://user-images.githubusercontent.com/71240296/170541418-9941760c-8542-43d5-8090-45369182103e.png" width="400">

5. nginx를 재설치 하고 main.py가 존재하는 폴더로 이동한다.
```
sudo service nginx restart
```

6. vi key.env 파일을 통해 env 파일을 작성한다.
```
vi key.env
```

7. 다음 명령어를 통해 서버를 실행한다.
```
uvicorn main:app --reload --env-file=".env"
```
