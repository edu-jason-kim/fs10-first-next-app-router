import Image from "next/image";
import Link from "next/link";
import styles from './ProductList.module.css'

export default function ProductList({ products = [] }) {
  if (products.length === 0) {
    return <p className={styles.empty}>상품이 없습니다.</p>;
  }

  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/products/${product.id}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.imgUrl}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productPrice}>
              {product.price.toLocaleString()}원
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
