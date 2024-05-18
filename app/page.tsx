import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/authOptions";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1 className="font-pixeify">
        Hello pixeify {session && <>{session.user?.name}</>}
      </h1>
      <h1 className="font-bungee">Hello bungee Font</h1>
      <Link href="users">User</Link>
      <ProductCard />
    </main>
  );
}

// export const metadata: Metadata = {
//   title: "Home Page",
//   description: "Home Page Description",
// };

export async function generateMetadata(): Promise<Metadata> {
  // const product = await fetch(""); // fetch data from db or other api

  return {
    title: "Title generateMetadata",
    description: "Description generateMetadata",
  };
}
