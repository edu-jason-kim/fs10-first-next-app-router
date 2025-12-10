import Counter from "./components/Counter";

// 서버에서만 실행하는 컴포넌트 -> 목적이 서버에서 HTML만드는 것
export default async function ProductsPage() {
  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/products",
    { cache: "force-cache" } // 빌드 시 캐시 -> SSG
  );
  const data = await response.json();
  const products = data.results;

  return (
    <main>
      <h1>프로덕트 페이지</h1>
      <hr />
      <Counter />
      <hr />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
