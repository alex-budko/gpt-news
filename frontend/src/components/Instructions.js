import {
  Box,
  Button,
  Center,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

function Instructions() {
  return (
    <Center>
      <VStack>
        <Box padding="3" rounded={"2xl"} boxShadow={"3xl"} bg="blue.100" w="600px">
          <SkeletonText startColor='purple.600' endColor='orange.500' mb="3" mt="4" noOfLines={5} spacing="2" skeletonHeight="3"  />
        </Box>
        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"3xl"}>
          <b>Enter Your Interests</b>: Open the app and type your interests or
          topics into the search box. The GPT algorithm will generate a list of
          news articles related to your interests.
        </Box>
        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"3xl"}>
          <b>Browse and Read</b>: Browse through the list of news articles and
          click on the ones you want to read. The app will take you to a
          separate page where you can read the full article.
        </Box>
        <Box p={"3"} bg={"blue.800"} rounded={"2xl"} boxShadow={"3xl"}>
          <b>Save and Change</b>: Save or bookmark articles you find interesting
          and change your interests or topics by entering new keywords in the
          search box. Refer to the app's help section or customer support for
          assistance if needed.
        </Box>
      </VStack>
    </Center>
  );
}

export default Instructions;
