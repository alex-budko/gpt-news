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
  DarkMode,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsRobot, BsFillPersonFill } from "react-icons/bs";
import "../NewsAggregator.css";
import { useAuth } from "../context/AuthContext";

function NewsAggregator() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveMessage = async (text, sender, gptResponses) => {
    try {
      await fetch("http://localhost:3001/save-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, sender, gptResponses }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      const convertedMessages = data.messages.flatMap((message) => {
        const { text, sender, gptResponses } = message;
        if (sender === "user") {
          return [{ text, sender }];
        } else {
          return [{ text: gptResponses, sender }];
        }
      });
      setMessages(convertedMessages);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleButtonClick = async () => {
    setMessages([...messages, { text: inputMessage, sender: "user" }]);
    saveMessage(inputMessage, "user", []);

    setInputMessage("");

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/generate-article-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      saveMessage(inputMessage, "gpt", gptResponse);
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
    <DarkMode>
      <Center>
        <VStack className="messages-container">
          <Box
            className="messages-container"
            overflowY="auto"
            minHeight={"380px"}
            maxHeight="380px"
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
            <Button
              onClick={handleButtonClick}
              colorScheme="purple"
              w={"100px"}
            >
              Send
            </Button>
          </HStack>
        </VStack>
      </Center>
    </DarkMode>
  );
}

export default NewsAggregator;
