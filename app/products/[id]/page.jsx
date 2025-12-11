// 다이나믹 라우트에서 SSG로 라우팅 하고 싶은 경우,
// generateStaticParams 서버 함수 활용

import { createReviewAction } from "@/app/actions";
import Reviews from "@/components/Reviews";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SubmitButton from "./components/SubmitButton";

export async function generateStaticParams() {
  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/products"
  );
  const data = await response.json();

  // 반환 값 [{ id: "1" }, ...]
  return data.results.map((product) => {
    return { id: product.id.toString() };
  });
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://learn.codeit.kr/api/codeitmall/products/${id}`
  );

  const product = await response.json();

  // 생성하고자 하는 metadata 객체를 응답
  return {
    title: `Codeitmall::${product.name}`,
  };
}

// [id]의 id 값은 params에서 받음
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const response = await fetch(
    `https://learn.codeit.kr/api/codeitmall/products/${id}`
  );

  if (response.status === 404) {
    notFound();
  }

  const product = await response.json();

  return (
    <main>
      <h1>{product.name}</h1>
      <Image src={product.imgUrl} width={300} height={300} alt={product.name} />

      <hr />

      <h2>사이즈 리뷰</h2>

      <Suspense fallback={<p>로딩중입니다...</p>}>
        <Reviews productId={id} />
      </Suspense>

      <hr />

      <h2>사이즈 리뷰 작성</h2>

      <form action={createReviewAction} style={{ paddingBottom: "500px" }}>
        <input type="hidden" name="productId" value={id} required />
        <select name="sex" required>
          <option value="">성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <input type="number" name="height" placeholder="키 (cm)" required />
        <select name="size" required>
          <option value="">사이즈 선택</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <select name="fit" required>
          <option value="">핏 선택</option>
          <option value="small">작음</option>
          <option value="good">적당함</option>
          <option value="big">큼</option>
        </select>

        <SubmitButton>리뷰 작성</SubmitButton>
      </form>
    </main>
  );
}
