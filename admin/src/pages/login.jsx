import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button, Container, Input } from '@chakra-ui/react';

const Login = ({ history }) => {
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
        height="76vh"
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
          className="arrange-to-top"
          >
          <Input
          placeholder="Username"
          marginBottom='40px'
        />
          <Input
          placeholder="Password"
          marginBottom='40px'
        />
        <Button
          colorScheme="green"
          size="lg"
          width="10vw"
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
