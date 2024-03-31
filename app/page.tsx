import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <Link href="users">User</Link>
      <a href="users/new">New User</a>
      <ProductCard />
    </main>
  );
}
