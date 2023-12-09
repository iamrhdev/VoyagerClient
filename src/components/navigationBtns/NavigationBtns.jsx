import { Button, Text } from "@chakra-ui/react";
import React from "react";

export default function NavigationBtns({
  page,
  pageCount,
  nextPage,
  prevPage,
}) {
  const isLastPage = page === pageCount;
  const isFirstPage = page === 1;
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Button onClick={() => prevPage()} isDisabled={isFirstPage}>
        Previous
      </Button>
      <Text>
        Current Page: {page} of {pageCount}
      </Text>
      <Button onClick={() => nextPage()} isDisabled={isLastPage}>
        Next
      </Button>
    </div>
  );
}
