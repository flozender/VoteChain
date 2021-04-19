import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Heading,
  Flex,
  Button,
  Container,
  Input,
  useToast,
} from '@chakra-ui/react';
import fetchApi from '../services/fetch-custom.js';

const Login = ({ history, setCurrentUser, ...props }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const success = () => {
      setLoading(false);
      toast({
        position: 'bottom-left',
        title: 'Success',
        description: 'Welcome back.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      history.push('/');
    };

    if (!username || !password) {
      toast({
        position: 'bottom-left',
        title: 'Missing Fields.',
        description: 'Please fill in all the data.',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      const body = data;
      fetchApi('/admin/auth', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          setCurrentUser({
            ...json,
          });
          localStorage.setItem('app-user', JSON.stringify(json));
          success();
        })
        .catch(err => {
          console.log(err);
          toast({
            position: 'bottom-left',
            title: 'Could not log you in',
            description: err.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  const { username, password } = data;

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        textAlign="center"
        fontSize="md"
        p={6}
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
        width="85%"
        alignItems="center"
        height="50vh"
        className="arrange-to-top"
      >
        <Container
          width="60%"
          alignItems="center"
          rounded="md"
          flexDirection="column"
          borderColor="teal"
          borderWidth="2px"
          borderStyle="solid"
          height="80vh"
        >
          <Heading fontSize="2xl" mt={4}>
            Sign In
          </Heading>
          <Flex
            textAlign="center"
            fontSize="md"
            p={6}
            borderRadius="md"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              name="username"
              placeholder="Username"
              marginBottom="40px"
              onChange={handleChange}
              value={username}
            />
            <Input
              name="password"
              placeholder="Password"
              marginBottom="40px"
              onChange={handleChange}
              value={password}
              type="password"
            />
            <Button
              colorScheme="teal"
              size="lg"
              width="10vw"
              isLoading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default withRouter(Login);
