import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";

export default async function SearchPage({ searchParams }) {
  // 서버에서 쿼리 스트링 접근
  const { q } = await searchParams;

  const response = await fetch(
    // q의 값이 동적이기 때문에 자동으로 페이지가 SSR로 설정됨
    "https://learn.codeit.kr/api/codeitmall/products" + `?q=${q}`,
    { cache: 'no-store' } // 캐싱을 하지 않겠다는 옵션 -> SSR로 동작
  );
  const data = await response.json();
  const products = data.results;

  return (
    <main>
      <h1>검색결과 페이지: {q}</h1>
      <SearchForm />
      <ProductList products={products} />
    </main>
  );
}
