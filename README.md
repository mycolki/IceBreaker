# <span style="color:#6bcdff"> **🧊 ICE BREAKER 🔨**

<p>
  <img src="readme.asset/playGame.gif" alt="ice-breaker" width="47%" />
  <img src="readme.asset/01-menu.png"  alt="menu" width="47%" />
</p>

### **❄️ <i>Guess what's inside the ice!**</i>

**아이스 브레이커**는 망치로 얼음 큐브를 깨면서,
얼음 아래로 보이는 그림이 무엇인지 맞추는 **Web App 게임**입니다.

### **❄️ <i>Motivation**</i>

스크래치 북과, 펭귄 얼음깨기 보드게임에서 모티브를 얻어 기획한 **아케이드** 게입니다.
재밌는 시각적인 요소들을 즐기면서 누구나 쉽게 체험할 수 있도록 만들었습니다.

### ❄️ <i>**[Demo LINK](https://icebreaker.colki.me/)**</i>

<br>
<br>
<br>
<br>

# <span style="color:#7879f1">📆 **DEVELOPMENT PLAN**

### **프로젝트 기간**

2021.9.27 ~ 2021.10.16 ( 3Week )

> 09.27 ~ 10.03 : 아이디어 기획 및 기능 정리 & Kanban분배<br />
> 10.04 ~ 10.16 : 개발 진행

<br>

### **프로젝트 준비**

- 🧠 [**Brain Storming**](https://www.notion.so/ideas-be87d168982e47688f7f3cb81f5a0e8d) : 프로젝트 아이디어

- **📝 [Features Planning](https://www.notion.so/features-08ed4725b3c345b9ab1bd94ecbdb658d)** : 프로젝트 기능 정리

- **🎨 [MockUp Figma](https://www.figma.com/file/tK8XW8HuDSSGUJU0p7KRhN/ICE-BREAKER?node-id=0%3A1)** : 프로젝트 목업 디자인

<br>

### **프로젝트 진행**

- Features : 프로젝트 세부 기능 기획

- MockUp by Figma : UI & UX 설계

- Kanban by Notion : Task 일정 분배

- Git Flow : 기능별 브랜치 Merge Strategy
  <br>
  <br>
  <br>
  <br>

# <span style="color:#7879f1">🥏 **STACK**

**FrontEnd**

- JavaScript ES2015+
- React
- React-router-dom
- Redux (Redux-toolkit)
- Konva.js
- Gsap
- Styled-component

**BackEnd**

- Firebase Realtime Database
- Amazon S3

**ThirdParty Stack**

- Netlify
- Lodash
- modernizr
- react-fastclick
- use-sound
- Jest
- React-testing
- EsLint
- Git
  <br>
  <br>
  <br>
  <br>

# <span style="color:#7879f1">🎮 **FEATURES**

```
🧊 얼음깨기 RULES
 ‣ Breaking Time 동안 최대한 많은 얼음을 깨야 합니다.
 ‣ Breaking Time이 끝나면 15초간 정답을 맞출 수 있습니다.
 ‣ 정답을 맞추면 바로 다음 문제로 넘어갈 수 있습니다.
 ‣ 레벨업 할 때마다 IceCube 의 난이도가 올라갑니다.
 ▾ 북극곰의 최애 콜라 아이템을 사용할 수 있습니다.
   ‣ 🥤 : 정답 입력 시간이 10초 연장됩니다.
   ‣ 🥤🥤 : 상대방의 정답 입력 시간을 5초 단축합니다.(같이 얼음깨기)
```

<br>

### **🧊🔨 혼자 얼음 깨기 : Solo Mode**

<div style="display: flex; text-align: center;">
  <img src="readme.asset/05-cube.png" alt="breaking" style="width: 32%; margin: 5px;"/>
  <img src="readme.asset/07-answer.png"  alt="answer" style="width: 32%; margin: 5px;" />
  <img src="readme.asset/10-ranking.png"  alt="ranking" style="width: 32%; margin: 5px;" />
</div>

- 경쟁에 대한 부담없이 혼자서도 게임을 즐길 수 있습니다.
- **랭킹**에 점수를 등록해서 자신의 점수를 널리 자랑할 수도 있습니다.

<br>

### **🧊🔨 같이 얼음 깨기 : Battle Mode**

<div style="display: flex; text-align: center;">
  <img src="readme.asset/02-rooms.png" alt="breaking" style="width: 32%; margin: 5px;"/>
  <img src="readme.asset/03-room.png"  alt="answer" style="width: 32%; margin: 5px;" />
  <img src="readme.asset/09-lost.png"  alt="ranking" style="width: 32%; margin: 5px;" />
</div>
<div style="display: flex; text-align: center;">
  <img src="readme.asset/06-item.png" alt="breaking" style="width: 32%; margin: 5px;"/>
  <img src="readme.asset/06-item_battle.png"  alt="answer" style="width: 32%; margin: 5px;" />
  <img src="readme.asset/06-item_solo.png"  alt="ranking" style="width: 32%; margin: 5px;" />
</div>

- **1 vs 1 매칭**으로 진행되며, 상대방이 다음 레벨로 넘어갈 때마다 알림이 뜨기 때문에 스릴을 느끼면서 긴장을 놓지 않고 얼음 깨기를 할 수 있습니다.
- 방 만들기
  방을 만들면 방 고유의 ID가 발급됩니다. 이 ID를 친구에게 공유할 수도 있습니다.
- 방ID로 바로 참여하기
  친구에게 전달받은 ID로 해당 방에 바로 입장할 수 있습니다.
- 둘 중 한 명이라도 마지막 레벨을 끝내는 순간 게임이 종료되며, 결과 화면에서 최종 점수와 승패를 확인할 수 있습니다.
  상대방이 다음 레벨로 넘어가거나, 상대방이 콜라 아이템으로 공격하면 **상단에 경고메시지**가 실시간으로 나타납니다.
  <br>

🧊 **게임 방법 : How to Play**

- 아이스브레이커 게임 규칙에 대한 페이지입니다.
  <br>
  <br>
  <br>
  <br>

# <span style="color:#7879f1">🏗 **INSTALLATION**

- 프로젝트를 다운받은 후 프로젝트 디렉토리 내부에서 `.env` 파일을 생성하고, 다음 환경 변수를 입력해주세요
  ```jsREACT_APP_FIREBASE_API_KEY>
  REACT_APP_FIREBASE_AUTH_DOMAIN>
  REACT_APP_FIREBASE_DATABASE_URL>
  REACT_APP_FIREBASE_PROJECT_ID>
  REACT_APP_FIREBASE_STORAGE_BUCKET>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID>
  REACT_APP_FIREBASE_APP_ID>
  REACT_APP_ICE_BREAKER_URL=https://icebreaker.colki.me
  ```
- 프로젝트를 다운받은 뒤 프로젝트 디렉토리 내부에서 다음 command 를 입력해주세요

  ```js
  $ npm install
  ```

- 다음 command를 입력한 후 로컬환경에서 애플리케이션을 실행해주세요

  ```js
  $ npm start
  ```

  로컬 URL: `http://localhost:3000`
  <br>
  <br>
  <br>
  <br>

# <span style="color:#6bcdff">**📣 PROJECT LOG**

### **<i>🔹 Why Firebase?</i>**

- **firebase를 서버로 사용하게 된 이유**
  imgUrl과 answer로 이루어진 퀴즈데이터의 단순한 구조와, 보안과 관련된 개인 계정을 저장하지 않기 때문에 서버를 따로 만들지 않고 firebase를 이용하는 방향으로 결정했습니다.
  또한 socket.io로 구현했던 [더빙게임 V-Live프로젝트](https://github.com/voicelive)에 비해 실시간 소통의 비중이 상대적으로 적었고, 새로운 방식으로도 socket을 구현해보고 싶었기 때문에 **firebase** **realtime database**를 선택했습니다.

### **<i>🔹 Why Konva?</i>**

- **캔버스 라이브러리를 선택하게 된 이유**

  얼음판 위에 그려지는 작은 얼음 큐브 하나하나에 각각 클릭이벤트 및 애니메이션을 조작해줘야 했기 때문에 캔버스를 사용하기로 결정했습니다. HTML5에서 기본으로 제공해주는 canvas api는 dom element를 조작해서 그래픽을 구현하는 방식이었기 때문에, 리액트 기반인 아이스브레이커와는 맞지 않다 생각되었습니다. 많은 라이브러리를 조사해보고 Fabric과 p5 그리고 Konva를 사용해본 끝에 라이브러리찾기 유목 생활을 정리할 수 있었습니다.

- **React-Konva**

  Konva깃허브 내부를 살펴봤을 때 리액트 컴포넌트를 상속받는 걸 확인했기 때문에, 기존 리액트를 다루듯이 작업할 수 있어서 이질감이 없었습니다.
  Konva에서의 canvas 를 담당하는 Stage > Layer > Shape 구조로 레이어별로 나눠서 작업할 수 있고 레이어 순서를 변경하는 일도 용이했습니다. Fabric, p5와 달리 JSX에서 Shape등을 정의함과 동시에 prop으로 속성을 같이 넣어줄 수 있기 때문에 굉장히 직관적이고 코드도 가벼워졌습니다.

- **아쉬운 부분 💦**

  다만 캔버스와 엘리먼트간에는 각자 공간을 차지하고 있기 때문에 레이어처럼 쌓아 올려지지 않아서, 게임화면의 점수, 메뉴, 아이템에서 reflow를 발생시킬 수 있는 스타일 속성들을 사용했던 부분이 있었습니다.
  <br>
  <br>

### **<i>🔸 Mobile Optimization 모바일 최적화</i>**

<br>
<br>

### **<i>🔸 CleanUp Error</i>**

게임화면에서 다음 문제 버튼을 클릭했을 때, 문제가 바뀌지 않고 계속 레벨 1의 문제만 나오는 버그가 발생했습니다. 하지만 현재 렌더링 된 컴포넌트가 아닌, 이미 이전에 언마운트된 Ready컴포넌트 useEffect 내부 dispatch함수가 버튼을 누를때마다 호출이 되고 있었습니다.
roomId가 있을 경우에 첫번째 문제를 할당하는 action을 보내는 코드에서 roomId가 없을 경우 early return 방식으로 **분기처리 순서만** 수정했을 뿐이었어서 처음에는 코드에 문제가 없다고 생각해서 시간이 조금 딜레이 되었으나, 지난 프로젝트에서도 에러를 많이 발생했던 부분이 peer 연결을 제대로 remove해주고 있지 않았었던 부분이었던지라 cleanUp 키워드를 떠올렸습니다.

<details>
  <summary><span style="color:#c1c1c1">수정 전 후 코드</summary>

Before

```js
useEffect(() => {
  if (roomId) {
    return onValue(ref(getDatabase(), `${ROOM}/${roomId}`), (snapshot) => {
      //do something
      dispatch(getFirstLevel());
    });
  }

  dispatch(getFirstLevel());
}, [dispatch, roomId]);
```

After

```js
useEffect(() => {
  if (!roomId) dispatch(getFirstLevel());

  onValue(ref(getDatabase(), `${ROOM}/${roomId}`), (snapshot) => {
    //do something
    dispatch(getFirstLevel());
  });
}, [dispatch, roomId]);
```

</details>
<br>
하지만 firebase가 V9로 업데이트 되고 나서 문서에서는 onValue의 return 값에 대한 부분이나, cleanUp 함수가 명시되어 있지 않았기 때문에, 직접 <b>return값</b> 을 확인한 후에 버그를 개선할 수 있었습니다.
<details>
  <summary><span style="color:#c1c1c1">onValue의 return값 확인</summary>

```js
useEffect(() => {
  if (roomId) {
    const cleanup = onValue(
      ref(getDatabase(), `${ROOM}/${roomId}`),
      (snapshot) => {
        const data = snapshot.val();

        if (!data) return;

        dispatch(replaceQuestions(data.questions));
        dispatch(getFirstLevel());
      },
    );

    console.log(cleanup);

    return cleanup;
  }

  dispatch(getFirstLevel());
}, [dispatch, roomId]);

//`() => repoRemoveEventCallbackForQuery(query._repo, query, container)`
```

</details>
<br>
onValue는 db가 바뀌는 순간을 듣고 있다가 callback을 실행하는 함수인데, 수정 전 코드에서는 return을 함으로써 cleanUp함수를 반환하므로 의도치않게 이벤트리스너를 제거하는 효과를 얻었지만, 수정 후 코드에서는 제거되지 않은 리스너가 언마운트 이후에도  이벤트를 듣고있기 때문에 발생헀던 버그였습니다. 리액트는 개발자가 의도했을 수 있기 때문에 메모리가 누수되더라도 별다른 조치를 하지 않는 다는 사실도 알게 되었습니다.
비록 시간은 딜레이 되었으나, 지난 경험을 바탕으로 문제를 회피하지 않고 직접 부딪치고, 근본적인 원리에 다가서서 문제를 해결하는 방법을 깨우치는 유익한 시간이었습니다.

<br>
<br>
<br>
<br>

# <span style="color:#e95353">**🍟 AFTER PROJECT**

🥤 처음 기획했던 아이스브레이커는 솔로모드로 혼자 게임하는 Web game이었습니다. 먼저 얼음깨기를 구현하고 나서 게임만들기 기능을 추가하려고 했지만, **이렇게 재밌고 알찬 게임을** 혼자서만 즐기기에는 아깝다는 생각이 들어서 배틀 모드를 추가하게 되었고, 갑자기 변동된 계획으로 원래의 스케줄이 많이 달라지게 되었습니다.

하지만 결과적으로는 SideEffect를 일으키는 FirebaseApi에 대한 이해도가 깊어졌습니다. 또한 혼자하기 모드로 게임진행이 모두 구현되어 있는 상황에서 실시간 소켓 관련한 로직이 추가되면서 기존 코드와 부딪히지 않도록 설계해야 했고, 어떻게 redux로 state를 관리하는 지 효율적일지 깊게 고민하는 시간을 가질 수 있었습니다.
