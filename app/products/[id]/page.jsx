// 다이나믹 라우트에서 SSG로 라우팅 하고 싶은 경우,
// generateStaticParams 서버 함수 활용

import Reviews from "@/components/Reviews";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    </main>
  );
}
