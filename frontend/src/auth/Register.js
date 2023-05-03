import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  Center,
  Select,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const { setCurrentUser, setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, location }),
      });
      if (!response.ok) {
        throw new Error("Error registering user");
      }

      const data = await response.json();
      setCurrentUser(username);
      setToken(data.token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Center>
      <VStack spacing={4}>
        <Text fontSize="3xl">Register</Text>
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
        <Select
          placeholder="Select location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="US, NY">US, NY</option>
          <option value="US, CA">US, CA</option>
          <option value="US, FL">US, FL</option>
        </Select>

        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}
        <Button bgColor={"blue.400"} onClick={handleSubmit}>
          Register
        </Button>
      </VStack>
    </Center>
  );
};

export default Register;
