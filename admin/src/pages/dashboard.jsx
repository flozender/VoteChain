import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button, HStack, Container } from '@chakra-ui/react';

const Dashboard = ({ history }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        textAlign="center"
        fontSize="md"
        p={3}
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
        width="85%"
        alignItems="center"
        height="76vh"
        className="arrange-to-top"
      >
        <Flex
          width="100%"
          alignItems="center"
          rounded="md"
          flexDirection="column"
        >
          <Heading mb={18}>VoteChain Administration</Heading>
          <Flex width="100%">
            <Card history={history} name="Voter Management" link="/voters" />
            <Card
              history={history}
              name="Election Management"
              link="/elections"
            />
          </Flex>
          <Flex width="100%">
            <Card history={history} name="Candidate Management" link="/candidates" />
            <Card history={history} name="Declare Results" link="/results" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Card = ({ name, link, history }) => {
  return (
    <Container
      p={10}
      mb={18}
      width="35%"
      height="30vh"
      alignItems="center"
      rounded="md"
      flexDirection="column"
      borderColor="teal"
      borderWidth="2px"
      borderStyle="solid"
      display="flex"
      justifyContent="space-between"
    >
      <Heading size="lg">{name}</Heading>
      <Button colorScheme="teal" onClick={() => history.push(link)}>
        MANAGE
      </Button>
    </Container>
  );
};

export default withRouter(Dashboard);
