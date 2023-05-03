import { Box, Center, HStack, useToast } from "@chakra-ui/react";
import { AiFillHeart, AiFillInfoCircle, AiFillGithub } from "react-icons/ai";
import React from "react";

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
