import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button } from '@chakra-ui/react';

const Dashboard = ({ history }) => {
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
        <Flex
          width="100%"
          alignItems="center"
          rounded="md"
          flexDirection="column"
        >
          <Heading fontSize="2xl" mb={10}>
            Management Dashboard
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

const DashboardButton = ({ name, fn, ...props }) => {
  let color = { backgroundColor: 'yellow' };

  return (
    <Button
      colorScheme="green"
      onClick={fn}
      size="lg"
      width="10vw"
      {...color}
      {...props}
    >
      {name}
    </Button>
  );
};

export default withRouter(Dashboard);
