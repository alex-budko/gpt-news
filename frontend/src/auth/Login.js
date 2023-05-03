import React, { useState } from "react";
import { Box, Button, VStack, Input, Text, Center } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); 
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Center>
      <VStack spacing={4}>
        <Text fontSize="3xl">Login</Text>
        <Box>
          <Input
            bgColor={"blue.400"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            bgColor={"blue.400"}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}
        <Button onClick={handleSubmit} bgColor={"blue.400"}>
          Login
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
