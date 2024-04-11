import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Metadata } from "next";

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
