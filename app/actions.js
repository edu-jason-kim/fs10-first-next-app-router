"use server";

import { revalidateTag } from "next/cache";

// POST /api/review
export async function createReviewAction(formData) {
  // 의도적으로 2초 지연시키기 (pending 확인)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const productId = formData.get("productId"); // string
  const sex = formData.get("sex");
  const height = formData.get("height"); // string
  const size = formData.get("size");
  const fit = formData.get("fit");

  console.log({ productId, sex, height, size, fit });

  // 실제 API 요청
  const response = await fetch(
    "https://learn.codeit.kr/api/codeitmall/size_reviews/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: Number(productId),
        sex,
        height: Number(height),
        size,
        fit,
      }),
    }
  );

  if (!response.ok) throw new Error("리뷰 작성에 실패했습니다.");

  console.log(response);
  console.log(await response.json());

  // revalidatePath(
  //   "https://learn.codeit.kr/api/codeitmall/size_reviews" +
  //     `?product_id=${productId}`
  // );
  revalidateTag(`size_reviews-${productId}`);
}
