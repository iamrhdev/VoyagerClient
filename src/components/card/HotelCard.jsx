import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";

export default function HotelCard({ hotels }) {
  return (
    <>
      {hotels.map((hotel) => (
        <Card key={hotel.id} maxW="sm">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                // Logo Goes here
                />

                <Box>
                  <Heading size="sm">{hotel.hotelName}</Heading>
                  <Text>Creator, Chakra UI</Text>
                </Box>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>{hotel.description}</Text>
          </CardBody>
          <Image
            objectFit="cover"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Chakra UI"
          />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon>
              Like
            </Button>
            <Button flex="1" variant="ghost" leftIcon>
              Comment
            </Button>
            <Button flex="1" variant="ghost" leftIcon>
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
