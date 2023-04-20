import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Input,
    Spinner,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  
  function NewsAggregator() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleButtonClick = async () => {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
  
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const gptResponse = "Consider Reading: Anton365, MaxNews"; 
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: gptResponse, sender: "gpt" },
      ]);
      setLoading(false);
    };
  
    const handleInputChange = (event) => {
      setInputMessage(event.target.value);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleButtonClick();
      }
    };
  
    return (
      <Center>
        <VStack>
          <Box
            overflowY="auto"
            h="450px"
            bg={"purple.100"}
            rounded={"2xl"}
            w={"450px"}
            mb="20px"
            p={4}
          >
            <Flex direction="column" justify="flex-end" h={loading ? "85%" : "100%"}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  bg={message.sender === "user" ? "gray.50" : "purple.600"}
                  color={message.sender === "user" ? "black" : "white"}
                  borderRadius="md"
                  p={2}
                  mb={2}
                  alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
                  minW={"100px"}
                  textAlign={"center"}
                >
                  {message.text}
                </Box>
              ))}
            </Flex>
            {loading && (
                <Center>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="purple.400"
                    size="xl"
                />
                </Center>
            )}
          </Box>
          <HStack>
            <Input
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              bg={"white"}
              color={"black"}
              w={"350px"}
              resize={"none"}
            />
            <Button onClick={handleButtonClick} colorScheme="purple" w={"100px"}>
              Send
            </Button>
          </HStack>
        </VStack>
      </Center>
    );
  }
  
  export default NewsAggregator;
  