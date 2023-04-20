import {
  Alert,
  AlertIcon,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import NewsAggregator from "./components/NewsAggregator";
import Instructions from "./components/Instructions";
import Icons from "./components/Icons";

function App() {
  const colors = useColorModeValue(
    ["purple.50", "blue.50"],
    ["purple.700", "blue.700"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <Center>
      <VStack>
        <Tabs
          boxShadow={"3xl"}
          mt="10"
          rounded={"3xl"}
          isFitted
          onChange={(index) => setTabIndex(index)}
          bg={bg}
        >
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Instructions</Tab>
          </TabList>
          <TabPanels isFitted p="2rem">
            <TabPanel minH={"400px"} w={"600px"}>
              <NewsAggregator />
            </TabPanel>
            <TabPanel minH={"400px"} w={"600px"}>
              <Instructions />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Icons />
      </VStack>
    </Center>
  );
}

export default App;
