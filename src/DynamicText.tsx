import React from "react";
import { TextScramble } from "@a7sc11u/scramble";
import useStore from "./store/store";
import { useControls } from "leva";

export default function DynamicText() {
  let tick = useStore((state) => state.tick);

  const [params] = useControls("Texts", () => ({
    text1: "Lorem ipsum (0)",
    text2: "Lorem ipsum (1)",
    text3: "Lorem ipsum (2)",
    text4: "Lorem ipsum (3)",
  }));

  const text: string[] = [
    params.text1,
    params.text2,
    params.text3,
    params.text4,
  ];

  return (
    <TextScramble
      className="bg-[#ef079b] bg-gradient-to-br text-transparent from-[#f8665d] via-[#f8665d] bg-clip-text"
      as="span"
      text={text[tick]}
    />
  );
}
