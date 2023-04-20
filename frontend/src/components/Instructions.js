import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Kbd,
  Link,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function Instructions() {
  return (
    <Center>
      <VStack>
        <HStack  mt="0" mb='5'>
          <Heading>ABNews</Heading>
          <Image alt="ABNews Logo" boxSize="50px" src="/gptnews-removebg-preview.png"></Image>
        </HStack>

        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"dark-lg"}>
          <b>Enter Your Interests</b>: Open the app and type your interests or
          topics into the search box. The GPT algorithm will generate a list of
          news articles related to your interests.
        </Box>
        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"dark-lg"}>
          <b>Browse and Read</b>: Browse through the list of news articles and
          click on the ones you want to read. The app will take you to a
          separate page where you can read the full article.
        </Box>
        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"dark-lg"}>
          <b>Save and Change</b>: Save or bookmark articles you find interesting
          and change your interests or topics by entering new keywords in the
          search box. Refer to the app's help section or customer support for
          assistance if needed.
        </Box>
        <Link href="https://platform.openai.com/docs/models/gpt-3-5" isExternal>
          Made with{" "}
          <Tooltip label="GPT 3.5" bg="gray.300" color="black">
            <Kbd>text-davinci-002</Kbd>
          </Tooltip>{" "}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </VStack>
    </Center>
  );
}

export default Instructions;
