import { TextEffect } from "@/components/motion-primitives/text-effect";

export default function Home() {
  return (
    <div className="text-3xl text-center font-bold text-orange-500 flex items-center justify-center h-40">
      <TextEffect per="word" as="h1" preset="slide">
        Hello welcome to Project
      </TextEffect>
    </div>
  );
}
