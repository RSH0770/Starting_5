# 🏀 Starting_5

Starting_5는 농구 관련 정보 제공 및 관리 기능을 갖춘 웹 애플리케이션입니다. React와 Firebase를 기반으로 구축되었으며, 사용자가 농구에 대한 다양한 정보를 얻고, 관리자는 사용자 및 게시물을 효율적으로 관리할 수 있도록 설계되었습니다.

## 🚀 주요 기능

- **사용자 인증**: Firebase Authentication을 통한 안전한 회원가입 및 로그인 기능.
- **농구 정보**: 'Introduce' 페이지를 통해 농구의 기본 규칙, 매력, 역사, 핵심 기본기 등 다양한 정보를 제공합니다.
- **NBA 리그 소개**: NBA 리그에 대한 간략한 소개와 동부/서부 컨퍼런스 소속 팀 목록을 시각적으로 제공합니다.
- **관리자 대시보드**: 관리자 권한을 가진 사용자에게 제공되는 대시보드로, 애플리케이션의 핵심 관리 기능에 접근할 수 있습니다.
- **사용자 관리**: 관리자는 'UserManagement' 페이지에서 등록된 사용자 목록을 확인하고, 사용자의 권한을 변경(일반 사용자 <-> 관리자)하거나 삭제할 수 있습니다.
- **반응형 웹 디자인**: Tailwind CSS를 활용하여 다양한 디바이스(모바일, 태블릿, 데스크탑)에서 최적화된 사용자 경험을 제공합니다.

## 🛠️ 사용 기술

- **프론트엔드**:
  - [React.js](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Router DOM](https://reactrouter.com/en/main)
- **백엔드/데이터베이스**:
  - [Firebase](https://firebase.google.com/) (Authentication, Firestore Database)

## 📦 시작하기

이 프로젝트를 로컬 환경에서 구동하기 위한 방법을 안내합니다.

### 📋 사전 준비 사항

- [Node.js](https://nodejs.org/en/download/) (LTS 버전 권장) 및 npm (Node Package Manager) 또는 Yarn이 설치되어 있어야 합니다.

### ⬇️ 설치

### 설치

프로젝트 파일을 가져오는 방법은 다음과 같습니다.

**ZIP 파일 다운로드(권장)**

- 해당 프로그램을 실행하기 위해 Firebase의 API 키를 필요로 합니다.
- 따라서 .env가 포함된 zip 파일의 압축을 해제한 뒤, 아래 단계를 따라해주세요.

1.  LMS에 업로드된 "Starting_5.zip" 파일의 압축을 풀어줍니다.
2.  원하는 위치에 압축을 해제한 후, VScode(Visual Studio Code)를 통해 해당 파일을 열어줍니다.
3.  터미널 또는 명령 프롬프트를 열고 압축을 해제한 프로젝트 디렉토리로 이동합니다 (예: `cd path/test/Starting_5`).
4.  이후 의존성 패키지를 설치하기 위해 다음 명령어를 터미널에서 입력해줍니다.
    ```bash
    npm install
    # 또는
    # yarn install
    ```
5.  만약 ZIP 파일로 프로그램을 실행하신다면, 터미널에서 npm run dev를 입력해 개발 서버를 실행하게 됩니다.
    ```bash
    npm run dev
    # 또는
    # yarn run dev
    ```

### 📂 프로젝트 구조

프로젝트의 전반적인 구조는 다음과 같습니다.

```

Starting_5/
├── public/ # 공용 정적 자산
├── src/
│ ├── auth/ # Firebase 초기화 및 인증 관련 설정
│ │ └── firebase.js
│ ├── components/ # 재사용 가능한 UI 컴포넌트들
│ ├── data/ # 정적 데이터 (예: NBA 팀 정보 - Team.js)
│ ├── pages/ # 주요 애플리케이션 페이지
│ │ ├── AdminDashboard.jsx # 관리자 대시보드
│ │ ├── UserManagement.jsx # 사용자 관리 페이지
│ │ ├── Introduce.jsx # 농구 및 NBA 소개 페이지
│ │ └── Home.jsx # 메인 랜딩 페이지
│ ├── App.js # 주 애플리케이션 컴포넌트 (라우팅 등)
│ ├── index.js # 애플리케이션의 진입점
│ ├── index.css # Tailwind CSS 지시어 및 전역 스타일
│ └── ...
├── .env.local # 환경 변수 파일 (Git에 포함되지 않음)
├── package.json # 프로젝트 의존성 및 스크립트
├── README.md # 현재 파일
└── ...

```

```

```
