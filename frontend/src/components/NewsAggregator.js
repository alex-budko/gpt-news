import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsRobot, BsFillPersonFill } from "react-icons/bs";
import "../NewsAggregator.css";

function NewsAggregator() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleButtonClick = async () => {
    setMessages([...messages, { text: inputMessage, sender: "user" }]);
    setInputMessage("");

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/generate-article-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputMessage }),
        }
      );

      const data = await response.json();
      const gptResponse = data.suggestions;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: gptResponse, sender: "gpt" },
      ]);
    } catch (error) {
      console.error(error);
    }
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
      <VStack className="messages-container">
        <Box
          className="messages-container"
          overflowY="auto"
          minHeight={"450px"}
          maxHeight="450px"
          bg={"gray.800"}
          rounded={"2xl"}
          w={"630px"}
          mb="20px"
          p={4}
        >
          <Flex
            direction="column"
            justify="flex-end"
            h={loading ? "85%" : "100%"}
            ref={messageEndRef}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                bg={message.sender === "user" ? "gray.50" : "gray.400"}
                color={message.sender === "user" ? "black" : "black"}
                borderRadius="md"
                p={2}
                mb={2}
                alignSelf={
                  message.sender === "user" ? "flex-end" : "flex-start"
                }
                minW={"100px"}
                textAlign={"center"}
              >
                <HStack>
                  {message.sender === "gpt" ? (
                    <BsRobot />
                  ) : (
                    <BsFillPersonFill />
                  )}
                  {message.sender === "user" ? (
                    <Text>{message.text}</Text>
                  ) : (
                    <VStack>
                      {message.text.map((article, i) => {
                        if (i !== 0) {
                          return (
                            <Box
                              key={i}
                              mb={3}
                              p={4}
                              boxShadow={"dark-lg"}
                              borderRadius="md"
                              bg="purple.800"
                              color={"white"}
                            >
                              <i>{article !== "" && article}</i>
                            </Box>
                          );
                        }
                      })}
                    </VStack>
                  )}
                </HStack>
              </Box>
            ))}
          </Flex>
          {loading && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="white"
                color="blue.400"
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
            placeholder="Type in your interests..."
            _placeholder={{
              color: "gray.400",
            }}
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
