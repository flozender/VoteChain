import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button, Container, Input } from '@chakra-ui/react';

const Login = ({ history }) => {

  const [data, setData] = useState({
    user: '',
    pass: '',
  });

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

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
          name = 'user'
          placeholder="Username"
          marginBottom='40px'
          onChange = {handleChange}
        />
          <Input
          name = 'pass'
          placeholder="Password"
          marginBottom='40px'
          onChange = {handleChange}
        />
        <Button
          colorScheme="teal"
          size="lg"
          width="10vw"
          onClick={() => history.push("/dashboard")}
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
