import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";

export default async function SearchPage({ searchParams }) {
  // 서버에서 쿼리 스트링 접근
  const { q } = await searchParams;

  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/products" + `?q=${q}`
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
