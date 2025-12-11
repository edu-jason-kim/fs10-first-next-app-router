"use client";

// error: 페이지 컴포넌트에서 발생한 에러 객체
// reset: 페이지 컴포넌트를 다시 렌더링 시도하는 함수
export default function ErrorPage({ error, reset }) {
  return (
    <main>
      <h1>문제가 발생했습니다</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시시도</button>
    </main>
  );
}
