import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button, Container } from '@chakra-ui/react';

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
            Login
          </Heading>
        </Container>
      </Flex>
    </Flex>
  );
};

export default withRouter(Login);
