# 염소를 구해라 (Saving Baby Goat)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)  
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/397e5e5a-09a1-4444-8e9e-2a5d78a21eaf/deploy-status)](https://app.netlify.com/sites/savingbabygoat/deploys)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqvndM%2Fbtrv4myCwGa%2FuWoC3TY3SfyWPsrton2Okk%2Fimg.png)

영양분을 섭취 하기 위해 고산지대의 염소들은 위험한 절벽에 매달려 돌을 핥아 먹습니다. 위험에 빠진 아기염소를 먼저 구하는 보드게임 형식의 웹 게임 입니다. 주사위를 굴려 미네랄을 얻고, 다이너마이트를 피해 먼저 염소를 구하면 승리 합니다.

<br/>

## 🔍 Motivation

처음 프로젝트를 구상할 때부터 알고리즘에 대한 관심이 많았습니다. 알고리즘을 이용하여 게임을 만들고 싶었고, 프로젝트를 구상하던 중 보드게임에서 아이디어를 얻어 프로젝트를 기획하게 되었습니다.

<br/>

## 🐐 Introduce & 🕹 Feature

### 게임 주소

- https://www.savingbabygoat.online

### 게임 방법

- 주사위를 굴려 나온 수 만큼 이동할 수 있습니다.
- 이동이 끝나면 사용자는 “턴종료"버튼을 클릭합니다.
- 미네랄 최소 2개를 획득하고 염소를 먼저 찾은 플레이어가 승리합니다.
- 바위로 막힌 길은 지나 갈 수 없습니다.
- 다이너마이트는 밟으면 폭발하고 이동횟수가 1 감소합니다.
- 게임에서 승리하게되면 승리한 플레이어의 시작점에서 부터, 미네랄 2개를 획득하고, 염소까지의 최단거리가 화면에 표시됩니다.

  ![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdpjPal%2Fbtrv5mx7k8X%2FH72FXyp2LKA6xVLC3YfjsK%2Fimg.png)

### 게임 난이도

| EASY                                                                                                                                                                  | NORMAL                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 미네랄 2개 이상 획득하고 염소를 먼저 찾으면 승리합니다.                                                                                                               | 막힌 길(바위)를 피해 미네랄 2개이상 획득하고 염소를 먼저 찾으면 승리합니다                                                                                             |
| ![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlFyXA%2Fbtrv5mx7leq%2FQYDWKQ29jNQ6nInCBFOi1K%2Fimg.png) | ![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdxsBgL%2Fbtrv0PBNPcb%2FhYEkHypvdKgoZlnOo725DK%2Fimg.png) |

| HARD                                                                                                                                                                                          | CUSTOM                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - 숨겨진 다이너마이트를 밟게 되면 이동횟수가 1 감소 합니다. <br> - 터진 다이어마이트는 빨간색으로 표시됩니다. <br>- 다시 클릭하면 지나갈 수 있습니다. <br> - 이외 Rule은 Normal과 동일합니다. | - 사용자가 자율적으로 맵을 만들어 플레이 할수 있습니다.<br> - Rule은 Hard 모드와 동일합니다.                                                                           |
| ![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1gkHD%2Fbtrv119PcLz%2FonrB902mn8O9Uw89kf1GS1%2Fimg.png)                         | ![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0SsKk%2Fbtrv5opaDk4%2F9sUK0PwsYjOoPqNY1vOyGk%2Fimg.png) |

### CUSTOM MAP

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGgyZu%2Fbtrv6d3AB76%2FJ7e0BLyHDMxiQPoAyTKNYk%2Fimg.png)  
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUsRBa%2Fbtrv6eBpTlE%2F7K4IlCguK3LQaSgsMKb4Tk%2Fimg.png)

- 사용자들이 직접 맵을 만들어 플레이 할 수 있습니다.
- 염소는 필수로 있어야 하며, 미네랄은 최소 2개 최대 10개 입니다.
- CUSTOM 맵들은 플레이 횟수가 많은 순서대로 보여지게됩니다.

<br/>

## ♾ Algorithm

### A Start search

출발 지점에서 목표 지점까지 가는 최단 경로를 찾는 알고리즘으로, [Dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) 알고리즘 에서 h(n)(휴리스틱)을 추가한 알고리즘 입니다.

```
A Star 알고리즘

f(n) = g(n) + h(n)

g(n) : 출발노드에서 현재(n)노드까지의 거리
h(n) : 현재(n)노드에서 목적지 노드 까지의 예상 거리 (manhattan distance 이용)

Open-Set : 길찾기 진행시 거리를 고려하게되는 노드들의 목록
Closed-Set : Open-Set에서 목적지 까지 가는데에 가장 짧은 거리를 가진 노드들의 목록

```

알고리즘 진행은 다음과 같습니다.

1. 출발 노드를 선택한다.
2. 출발 노드 를 Open-Set 에 추가 한다.
3. Open-Set이 '0'이 되거나 가장 비용이 작은 노드가 목표 노드가 될때까지 다음을 반복한다.  
   a. Open-Set에서 가장 거리가 f(n) 같이 짧은 노드를 검색 (최초에는 시작 노드)  
   b. 현재 노드를 Closed-Set에 추가 하고 Open-Set에서 제거  
   c. Closed-Set의 상하좌우 4방향을 탐색하고 Open-Set에 추가 (이동할 수 없는 노드이면 제외)  
   d. Closed-Set에 있다면 제외

[A Start serch 알고리즘 WIKI](https://en.wikipedia.org/wiki/A*_search_algorithm)  
[Manhattan Distance](https://ko.wikipedia.org/wiki/%EB%A7%A8%ED%95%B4%ED%8A%BC_%EA%B1%B0%EB%A6%AC)

## 🗓 Schedule

#### 1주차 기획 📝

- 목업
- DB Schema
- KANBAN

#### 2주차 개발 👨🏻‍💻

- 시작페이지
- 게임페이지
- 소켓통신 구현
- LEVEL 별 로직
  - EASY
  - NORMAL
  - HARD

#### 3주차 마무리 🧪

- CUSTOM 페이지
- 배포
  - FE - netlify
  - BE - AWS Elastic Beanstalk
- 테스트 코드 작성

<br/>

## 🪄 Tech Stack

### Client

- React
  - React-Redux
  - Redux Toolkit
- Socket.io-client
- styled-components
- Axios

### Server

- Node.js
  - Express
- MongoDB
  - Mongoose
- Socket.io

### Test

- Client
  - Jest
  - React-Testing-Library
- Server
  - mocha
  - chai
  - sinon
  - supertest

### Deploy

- Client - Netlift
- Server - AWS Elastic Beanstalk

### ETC

- eslint
- prettier
- husky

<br/>

## 📓 프로젝트 후기

### 나 왜 게임 만든다고 했지...?

- 프로젝트를 진행하면서 제일 많이 했던말이 ‘내가 왜 게임을 주제로 했을까?’, ‘내가 왜 알고리즘을 사용하여 게임을 만든다고 했을까?’ 입니다. 지금까지 개발하면서 만들었던 게임들은 주로 혼자하는 게임이거나 복잡한 로직이 없는 게임이었습니다. 이번 프로젝트는 이전과는 다르게 Socket.io를 이용하여 실시간 통신이 추가 되었고, 이에 따른 Client측에서 두명의 사용자의 실시간 상태관리가 필요했습니다. 또한 AStar 알고리즘을 이용하여 최단경로를 찾아야하는 어려움이 있었습니다.
- 초반에 게임 기획을 하면서, Socket 연결만 잘 되면 이후 부터는 금방 하겠지 라는 생각을 했었는데 큰 오산이었습니다. 플레이어(1)의 인풋에 따라 해당 사용자의 상태를 업데이트 해줘야 하고, 이에 따라 플레이어(2)의 상태도 업데이트 해줘야 했습니다. 플레이어 2명의 상태 관리를 1개의 코드에서 관리를 하려하니 로직이 매우 복잡해 졌습니다. 게임을 진행하면서 발생할 수 있는 모든 경우의 수를 생각했고 최대한 비슷한 기능끼리 묶어 구현했고, 또한 리덕스 미들웨어를 이용하여 소켓통신으로 인한 상태 변경시 즉각 반영되도록 구현했습니다.
- 기존까지 알고있던 길찾기 알고리즘은 DFS, BFS, Dijkstra가 전부 였습니다. 3가지 알고리즘 모두 시작 지점만 알고 있는 상태에서 진행을 합니다. 또한 DFS, BFS는 가중치를 적용할 수 없습니다. 이런 이유때문에 새로운 알고리즘을 검색했고 제가 찾는 방법은 AStart 알고리즘 입니다.
  AStar 알고리즘은 앞서 말한 3가지 알고리즘과는 달리 시작지점과 종료 지점을 알고있는 상태에서 시작을 합니다. Dijkstra 알고리즘의 확장판 이라고도 할수 있는데요, Dijkstra에 H(n) 휴리스틱을 추가한 알고리즘 입니다. 새로운 알고리즘을 학습하고, 이를 저의 프로젝트에 적용하는데 시간이 오래 걸렸습니다.

### 솔플의 어려움... 그리고 뿌듯함과 아쉬움

- 먼저, 기획 단계부터 개발을 끝낸 지금까지 잠을 거의 못잤지만, 혼자서 기획, 개발, 배포까지 끝내고 나니 매우매우 뿌듯합니다.
- 첫 프로젝트를 팀 프로젝트로 진행했었고, 혼자서 프로젝트를 시작하게 되니 많은 압박과 두려움이 앞섰습니다. 기획 단계에서 부터 혼자 고민하고 결정해야 하는 부분에서 어려움을 많이 느꼈습니다. 개발을 할때는 좀 더 간단한 로직과 풀이방법이 있을것 같은데 피드백을 받지 못하고 스스로 해결을 해야는 부분이 제일 힘들었습니다.
- 프로젝트의 완성도를 최대한 끌어올리지 못한것이 제일 많이 아쉬운 점입니다. 개발 도중 Redux 상태값들을 싹 갈아엎고 처음부터 다시 작성하였기도 했고, Socket을 이용한 실시간 통신 로직도 몇번이고 수정을 하였습니다. 이에 따라 시간이 많이 딜레이 되어 시간에 쫓겨 개발을 하였습니다.
- 이번 개인 프로젝트를 진행하면서 어려움이 많았지만, 내가 구현한 로직으로 게임이 실행되고 결과가 나온다는 과정에서 다시 한번 개발에 재미를 느끼게 되었고 많은 것을 배울 수 있었던 프로젝트였습니다.

<br/>

## ⚙️ Installation

Saving Baby Goat는 배포가 되어 사용가능합니다.  
로컬에서 구동을 원하실 경우 아래의 .env파일 설정이 필요합니다.

### client

```
REACT_APP_AXIOS_BASE_URL=http://localhost:8000
```

### Server

```
DB_URL="Your mongoDB URL"

TEST_DB_LOCAL_URL=mongodb://127.0.0.1/test

CORS_ORIGIN_URL=http://localhost:3000
```

## 🧪 TEST

Test 명령은 Client, Server 동일합니다.

```
$ npm test
```
