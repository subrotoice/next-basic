import Image from "next/image";
import fieldImg from "@/public/field.jpg";

export default async function Home() {
  return (
    <main className="relative h-screen">
      <h1>Hello World From opt-img</h1>
      <Image
        src="https://img.youtube.com/vi/27YP6n6pDh0/maxresdefault.jpg"
        alt="YouTube Thumb"
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-widht: 768px) 50vw, 33vw"
        quality={100}
      />
    </main>
  );
}
