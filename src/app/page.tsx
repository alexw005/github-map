import GithubMap from "@/components/GithubMap";
import dynamic from "next/dynamic";
import Image from "next/image";

export default function Home() {

  const DynamicGithubMap = dynamic(() => import("@/components/GithubMap"), {
    ssr: false,
  })
  return (
    <main>
      <div className="">
        <DynamicGithubMap />
      </div>
    </main>
  );
}
