export default async function Reviews({ productId }) {
  // 의도적으로 2초 지연
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/size_reviews" +
      `?product_id=${productId}`,
    { cache: "no-store" } // SSR
  );
  const data = await response.json();
  const reviews = data.results;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          {review.sex} {review.height} {review.size} {review.fit}
        </li>
      ))}
    </ul>
  );
}
