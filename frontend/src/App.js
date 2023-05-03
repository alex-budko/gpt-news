import {
  Center,
  DarkMode,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useColorModeValue,
  Button,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import NewsAggregator from "./components/NewsAggregator";
import Instructions from "./components/Instructions";
import Icons from "./components/Icons";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useAuth } from "./context/AuthContext";


function App() {
  const colors = useColorModeValue(
    ["purple.700", "blue.700"],
    ["purple.700", "blue.700"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  const { setCurrentUser, currentUser } = useAuth();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <DarkMode>
        <Center>
          <VStack>
            {currentUser ? (
              <>
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
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <HStack>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </HStack>
            )}
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
            <Icons />
          </VStack>
        </Center>
      </DarkMode>
    </Router>
  );
}

export default App;
