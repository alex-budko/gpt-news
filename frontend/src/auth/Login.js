import React, { useState } from "react";
import { Box, Button, VStack, Input, Text, Center } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password); 
      setError(null);
      console.log("redirect")
      navigate("/");
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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
