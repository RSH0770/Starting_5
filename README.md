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

프로젝트 파일을 가져오는 방법은 두 가지가 있습니다: 저장소를 클론하거나 ZIP 파일을 다운로드합니다.

**옵션 1: 저장소 클론 (권장)**

1.  Git을 사용하여 저장소를 클론합니다:
    ```bash
    git clone [https://github.com/RSH0770/Starting_5.git](https://github.com/RSH0770/Starting_5.git)
    ```
2.  프로젝트 디렉토리로 이동합니다:
    ```bash
    cd Starting_5
    ```

**옵션 2: ZIP 파일 다운로드**

1.  [GitHub 저장소 페이지](https://github.com/RSH0770/Starting_5)로 이동합니다.
2.  녹색 "Code" 버튼을 클릭하고 "Download ZIP"을 선택하여 프로젝트 파일을 다운로드합니다.
3.  다운로드한 ZIP 파일의 압축을 원하는 위치에 해제합니다.
4.  터미널 또는 명령 프롬프트를 열고 압축을 해제한 프로젝트 디렉토리로 이동합니다 (예: `cd path/to/Starting_5-main`).

**이후 단계 (두 옵션 모두 동일)**

3.  의존성 패키지를 설치합니다:
    ```bash
    npm install
    # 또는
    # yarn install
    ```

### 🔥 Firebase 설정

이 애플리케이션은 Firebase를 백엔드로 사용합니다. 프로젝트를 실행하기 전에 Firebase 설정을 완료해야 합니다.

1.  [Firebase Console](https://console.firebase.google.com/)에 접속하여 새로운 프로젝트를 생성합니다.
2.  생성된 Firebase 프로젝트 내에서 웹 앱을 추가합니다.
3.  웹 앱 설정 과정에서 제공되는 Firebase 설정 객체(`firebaseConfig`)를 복사합니다. 예시:
    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    };
    ```
4.  프로젝트의 루트 디렉토리에 `.env.local` 파일을 생성합니다.
5.  `.env.local` 파일에 Firebase 설정 값을 환경 변수 형태로 추가합니다. `REACT_APP_` 접두사를 붙여야 React 애플리케이션에서 접근할 수 있습니다:
    ```
    REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    ```
    **참고**: `src/auth/firebase.js` 파일이 위 환경 변수들을 올바르게 사용하고 있는지 확인하세요. (예시: `process.env.REACT_APP_FIREBASE_API_KEY`)
6.  Firebase Authentication 및 Cloud Firestore 데이터베이스를 Firebase Console에서 활성화해야 합니다.
    - **Authentication**: "시작하기" → "이메일/비밀번호" 제공업체 활성화
    - **Firestore Database**: "데이터베이스 생성" → 보안 규칙을 "테스트 모드"로 시작하여 초기 개발을 용이하게 하거나, 적절한 보안 규칙을 설정합니다.

### 🚀 애플리케이션 실행

Firebase 설정이 완료되면, 개발 서버를 시작합니다:

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
