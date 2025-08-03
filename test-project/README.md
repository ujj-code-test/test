# React + Vite + Ant Design + AG Grid + Tailwind CSS + Biome 예제 프로젝트

이 프로젝트는 React, Vite, Ant Design, AG Grid, Tailwind CSS, Biome를 사용한 현대적인 웹 애플리케이션 예제입니다.

## 🚀 기술 스택

- **React 19** - 사용자 인터페이스 라이브러리
- **Vite** - 빠른 빌드 도구
- **Ant Design** - 엔터프라이즈급 UI 컴포넌트 라이브러리
- **AG Grid** - 강력한 데이터 그리드 컴포넌트
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Biome** - 빠른 린터 및 포맷터
- **Generouted** - 파일 기반 라우팅

## 📦 설치 및 실행

### 의존성 설치
```bash
pnpm install
```

### 개발 서버 실행
```bash
pnpm run dev
```

### 프로덕션 빌드
```bash
pnpm run build
```

### 빌드 미리보기
```bash
pnpm run preview
```

## 🔧 개발 도구

### 코드 포맷팅 및 린팅
```bash
# 코드 포맷팅
pnpm run format

# 린팅
pnpm run lint

# 코드 검사
pnpm run check
```

## 🎯 주요 기능

### 1. 대시보드
- 통계 카드 (총 사용자, 활성 사용자, 신규 가입)
- 사용자 목록 테이블 (AG Grid)

### 2. 사용자 관리
- 사용자 데이터 그리드
- 다중 선택 기능
- 페이지네이션

### 3. 사이드바 네비게이션
- 반응형 레이아웃
- 메뉴 기반 라우팅

### 4. Tailwind CSS 스타일링
- 유틸리티 클래스 기반 스타일링
- 반응형 디자인
- 커스텀 컴포넌트 스타일링

## 📁 프로젝트 구조

```
test-project/
├── src/
│   ├── App.jsx          # 메인 애플리케이션 컴포넌트
│   ├── App.css          # 애플리케이션 스타일
│   ├── main.jsx         # 애플리케이션 진입점
│   └── index.css        # 전역 스타일 (Tailwind CSS 포함)
├── public/              # 정적 파일
├── vite.config.js       # Vite 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── postcss.config.js    # PostCSS 설정
├── biome.json          # Biome 설정
└── package.json         # 프로젝트 의존성
```

## 🎨 UI 컴포넌트

### Ant Design 컴포넌트
- `Layout` - 전체 레이아웃 구조
- `Menu` - 사이드바 네비게이션
- `Card` - 콘텐츠 카드
- `Button` - 버튼 컴포넌트
- `Typography` - 텍스트 스타일링

### AG Grid 기능
- 데이터 표시
- 정렬 및 필터링
- 페이지네이션
- 행 선택
- 커스텀 스타일링

### Tailwind CSS 클래스
- `flex`, `grid` - 레이아웃
- `p-6`, `m-4` - 간격
- `text-2xl`, `font-bold` - 타이포그래피
- `bg-white`, `text-blue-600` - 색상
- `rounded-lg`, `shadow-md` - 효과

## 🔧 개발 환경 설정

이 프로젝트는 다음 개발 도구를 사용합니다:

- **Biome** - 코드 품질 관리 및 포맷팅
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **PostCSS** - CSS 전처리기
- **pnpm** - 패키지 매니저
- **Vite** - 개발 서버 및 빌드 도구

## 📱 반응형 디자인

모바일 및 태블릿 환경을 위한 반응형 디자인이 적용되어 있습니다:

- 모바일에서 사이드바는 오버레이로 표시
- 그리드 레이아웃 자동 조정
- 터치 친화적 인터페이스
- Tailwind CSS 반응형 클래스 활용

## 🚀 배포

이 프로젝트는 Vite를 사용하여 정적 파일로 빌드할 수 있으며, Netlify, Vercel, GitHub Pages 등에 배포할 수 있습니다.

```bash
pnpm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🎨 스타일링 가이드

### Tailwind CSS 사용법
```jsx
// 기본 클래스
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-800">제목</h1>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    버튼
  </button>
</div>

// 반응형 클래스
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 반응형 그리드 */}
</div>
```

### Ant Design과 Tailwind CSS 조합
```jsx
<Card className="shadow-lg rounded-xl">
  <Typography.Title className="text-blue-600 mb-4">
    카드 제목
  </Typography.Title>
</Card>
```
