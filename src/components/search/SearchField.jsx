import { Input, Stack } from "@chakra-ui/react";
import React from "react";

export default function SearchField() {
  return (
    <>
      <Stack>
        <Input variant="flushed" placeholder="Search" />
      </Stack>
    </>
  );
}
