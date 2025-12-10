'use client';
import { useState } from "react";

// 브라우저에서 JS가 필요한 컴포넌트(onclick 이벤트 등)는 반드시 client component로 선언
// client component는 따라서 해당 컴포넌트의 JS 번들을 브라우저로 전송
export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>;
}
