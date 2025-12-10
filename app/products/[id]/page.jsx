// 다이나믹 라우트에서 SSG로 라우팅 하고 싶은 경우,
// generateStaticParams 서버 함수 활용

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

// [id]의 id 값은 params에서 받음
export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return (
    <main>
      <h1>프로덕트 디테일 페이지: {id}</h1>
    </main>
  );
}
