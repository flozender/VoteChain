import React, { useState, useContext, createContext } from 'react';
import {
  Button,
  Box,
  Heading,
  Spacer,
  Flex,
  Text,
  ChakraProvider,
  Grid,
  VStack,
  Image,
  theme,
} from '@chakra-ui/react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ResRoute from './pages/resRoute';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import logo from './assets/icon.png';

// Page imports
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Elections from './pages/elections';
import Voters from './pages/voters';
import Candidates from './pages/candidates';
import Results from './pages/results';
import Logout from './pages/logout';
import ViewResults from './pages/viewResults';

export const ReloadContext = createContext(null);

const App = props => {
  let user = JSON.parse(localStorage.getItem('app-user')) || null;
  const [currentUser, setCurrentUser] = useState(user);
  const [reload, setReload] = useState(true);

  const triggerReload = () => {
    setReload(reload => !reload);
  };

  return (
    <ReloadContext.Provider value={{ reload, triggerReload }}>
      <ChakraProvider theme={theme}>
        <Nav history={props.history} currentUser={currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return currentUser ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            exact
            path="/login"
            component={() => <Login setCurrentUser={setCurrentUser} />}
          />
          <ResRoute
            path="/elections"
            currentUser={currentUser}
            component={() => (
              <Elections
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <ResRoute
            path="/voters"
            currentUser={currentUser}
            component={() => (
              <Voters
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <ResRoute
            exact
            path="/candidates"
            currentUser={currentUser}
            component={() => (
              <Candidates
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <ResRoute
            exact
            path="/results"
            currentUser={currentUser}
            component={() => (
              <Results
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <ResRoute
            exact
            path="/elections/:electionID"
            currentUser={currentUser}
            component={() => (
              <ViewResults
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <ResRoute
            exact
            path="/dashboard"
            component={() => <Dashboard />}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/logout"
            component={() => <Logout setCurrentUser={setCurrentUser} />}
          />
        </Switch>
      </ChakraProvider>
    </ReloadContext.Provider>
  );
};

const Nav = ({ history, currentUser }) => {
  return (
    <Flex marginBottom={3} alignItems="center" height="100px">
      <Box>
        <Heading
          onClick={() => history.push('/')}
          size="2xl"
          fontFamily="Allan"
          cursor="pointer"
        >
          <Image src={logo} height="100px" ml={3} mt={3} />
        </Heading>
      </Box>
      <Spacer />
      {currentUser ? (
        // Signed In User
        <Box>
          <Button
            mr={3}
            colorScheme="teal"
            variant="outline"
            onClick={() => history.push('/logout')}
          >
            Log out
          </Button>
          <ColorModeSwitcher justifySelf="flex-end" mr={3} ml={0} />
        </Box>
      ) : (
        // No user
        <Box>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
          <ColorModeSwitcher justifySelf="flex-end" mr={3} ml={0} />
        </Box>
      )}
    </Flex>
  );
};

export default withRouter(App);
