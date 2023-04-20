import { Alert, AlertIcon, Center, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NewsAggregator from "./components/NewsAggregator";
import Instructions from "./components/Instructions";

function App() {
  const colors = useColorModeValue(
    ['red.50', 'teal.50', 'blue.50'],
    ['red.900', 'teal.900', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  const [value, setValue] = useState('Hi');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/getLove');
      const data = await response.json();
      setValue(data.value);
    }
  
    fetchData();
  }, []);

  return (
    <Center>
      <Tabs rounded={"3xl"} isFitted onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList>
          <Tab>{value}</Tab>
          <Tab>Instructions</Tab>
        </TabList>
        <TabPanels  isFitted p='2rem'>
          <TabPanel w={"600px"}>
            <NewsAggregator />
          </TabPanel>
          <TabPanel w={"600px"}>
            <Instructions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}

export default App;
