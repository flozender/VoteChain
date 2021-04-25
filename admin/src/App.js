import React, { useState } from 'react';
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

const App = props => {
  let user = JSON.parse(localStorage.getItem('app-user')) || null;

  const [currentUser, setCurrentUser] = useState(user);
  return (
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
        <Route
          exact
          path="/elections"
          component={() => (
            <Elections
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route
          exact
          path="/voters"
          component={() => (
            <Voters currentUser={currentUser} setCurrentUser={setCurrentUser} />
          )}
        />
        <Route
          exact
          path="/candidates"
          component={() => (
            <Candidates
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route
          exact
          path="/results"
          component={() => (
            <Results
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route
          exact
          path="/elections/:electionID"
          component={() => (
            <ViewResults
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route exact path="/dashboard" component={() => <Dashboard />} />
        <Route
          exact
          path="/logout"
          component={() => <Logout setCurrentUser={setCurrentUser} />}
        />
      </Switch>
    </ChakraProvider>
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
            onClick={() => history.push('/profile')}
          >
            Profile
          </Button>
          <Button
            mr={3}
            colorScheme="teal"
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
