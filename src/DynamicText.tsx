import React from "react";
import { TextScramble } from "@a7sc11u/scramble";
import useStore from "./store/store";

type Props = {};

export default function DynamicText({}: Props) {
  let tick = useStore((state) => state.tick);

  const text: string[] = [
    "Lorem ipsum (0)",
    "Lorem ipsum (1)",
    "Lorem ipsum (2)",
    "Lorem ipsum (3)",
  ];

  return (
    <TextScramble
      className="bg-[#ef079b] bg-gradient-to-br text-transparent from-[#f8665d] via-[#f8665d] bg-clip-text"
      as="span"
      text={text[tick]}
    />
  );
}
