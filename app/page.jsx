import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";

export default async function Home() {
  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/products",
    { next: { revalidate: 60 } } // ISR처럼 동작 (60초마다 재검증)
  );
  const data = await response.json();
  const products = data.results;

  return (
    <main>
      <h1>홈페이지</h1>
      <SearchForm />
      <ProductList products={products} />
    </main>
  );
}
