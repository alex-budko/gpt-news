import { Box, Center, HStack, Heading, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart, AiFillInfoCircle, AiFillGithub } from "react-icons/ai";

function LoveCount() {
  const toast = useToast();
  return (
    <Center>
      <HStack mb={"30px"}>
        <Box
          onClick={() => {
            toast({
              title: "Awwwee!",
              description: "I love you too!",
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          }}
          _hover={{ cursor: "grab" }}
        >
          <AiFillHeart color="red" />
        </Box>
        <Box
          onClick={() => {
            toast({
              title: "Made By:",
              description: "Alexander Budko",
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          }}
          _hover={{ cursor: "grab" }}
        >
          <AiFillInfoCircle color="pink" />
        </Box>
        <Box
          onClick={() => {
            toast({
              title: "Check It Out:",
              description: "github.com/alex-budko/gpt-news",
              status: "info",
              duration: 2000,
              isClosable: true,
            });
          }}
          _hover={{ cursor: "grab" }}
        >
          <AiFillGithub />
        </Box>
      </HStack>
    </Center>
  );
}

export default LoveCount;
