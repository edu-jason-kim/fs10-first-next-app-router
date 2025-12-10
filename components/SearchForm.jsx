"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  // 검색 기능
  function handleSubmit(e) {
    e.preventDefault();

    // 검색 페이지로 이동
    router.push(`/search?q=${value}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button>검색</button>
    </form>
  );
}
