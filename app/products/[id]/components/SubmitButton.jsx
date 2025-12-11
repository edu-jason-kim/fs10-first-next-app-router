"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children = "제출하기" }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "제출 중..." : children}
    </button>
  );
}
