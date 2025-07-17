### 프로젝트 환경설정

-   리액트 라우터 설치 명령어: `npm i react-router` <br />
-   Supabase 설치 명령어: `npm install @supabase/supabase-js` <br />
-   텍스트 에디터 공식문서: `https://www.blocknotejs.org/docs/quickstart` <br />
-   텍스트 에디터 설치 명령어: `npm install @blocknote/core @blocknote/react @blocknote/mantine` <br />
-   중앙집중식 상태관리 라이브러리 Zustand 설치 명령어: `npm install zustand` <br />

### UI 구현에 필요한 Shadcn UI 컴포넌트

-   Avatar: `npx shadcn@latest add avatar` <br />
-   Button: `npx shadcn@latest add button` <br />
-   Card: `npx shadcn@latest add card` <br />
-   React Hook Form: `npx shadcn@latest add form` <br />
-   Input: `npx shadcn@latest add input` <br />
-   Select: `npx shadcn@latest add select` <br />
-   Sepearator: `npx shadcn@latest add separator` <br />
-   Skeleton: `npx shadcn@latest add skeleton` <br />

### Supabase 회원가입 및 로그인 가이드

-   Supabase 공식문서 회원가입 or 로그인 진행 👉🏻 깃허브 계정 추천!
-   Supabase 프로젝트를 생성한 후, Table Editor 메뉴 선택
-   New table 버튼을 클릭하여, users 라는 이름으로 테이블 이름 작성
-   Sheet UI 하단의 id 링크 아이콘 클릭 👉🏻 Select a schema에서 auth 선택
-   Select a table to reference to에서 users 선택
-   auth.users 옵션에서 id(uuid) 선택 👉🏻 save 버튼 클릭
    <br />
-   Authentication 메뉴 선택 후 Sign In / Providers 메뉴 선택
-   하단의 Email 토글 선택 👉🏻 Confirm email 토글 해제
-   공식문서 기반 회원가입(signUp), 로그인(signInWithPassword) 함수 사용하여 기능 개발 착수

### Supabase 소셜 로그인 가이드

-   구글 Google 로그인 (준비 중)
-   카카오 Kakao 로그인 (준비 중)
