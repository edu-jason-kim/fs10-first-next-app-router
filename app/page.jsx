import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  // TODO:
  // Server Component에서 data fetching하는 방식으로 products 데이터를 가져온 뒤
  // ProductList 컴포넌트의 속성으로 전달하기

  return (
    <main>
      <h1>홈페이지</h1>
      <SearchForm />
      <ProductList />
    </main>
  );
}
