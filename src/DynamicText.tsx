import React from "react";
import { TextScramble } from "@a7sc11u/scramble";

type Props = {};

export default function DynamicText({}: Props) {
  return (
    <TextScramble
      className="text-xl"
      as="h1"
      text="Lorem ipsum siamet dolorum"
    />
  );
}
