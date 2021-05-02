import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import {
  Heading,
  Flex,
  Button,
  Text,
  VStack,
  Stack,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import '../assets/scroll.css';
import fetchApi from '../services/fetch-custom.js';

const ViewResults = ({ history, currentUser, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenParty,
    onOpen: onOpenParty,
    onClose: onCloseParty,
  } = useDisclosure();

  const toast = useToast();

  const { electionID } = useParams();

  const [parties, setParties] = useState([]);
  const [votes, setVotes] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    fetchApi(`/admin/getPartyWiseVotes/${electionID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setParties(json.parties);
      })
      .catch(err => {
        console.log(err);
        toast({
          position: 'bottom-left',
          title: 'Could not load party data',
          description: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
    fetchApi(`/admin/getRegionWiseVotes/${electionID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setVotes(json.votes);
      })
      .catch(err => {
        console.log(err);
        toast({
          position: 'bottom-left',
          title: 'Could not load region data',
          description: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
  }, [currentUser, toast, electionID]);

  if (parties.length === 0 || votes.length === 0) {
    return <Spinner />;
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        textAlign="center"
        fontSize="md"
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        height="76vh"
      >
        <Flex
          width="100%"
          alignItems="center"
          rounded="md"
          flexDirection="column"
          mb={5}
        >
          <Flex
            alignItems="baseline"
            justifyContent="center"
            width="100%"
            mb={5}
          >
            <Flex width="60%" alignItems="baseline">
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => history.goBack()}
              >
                Back
              </Button>
              <Heading width="100%">Election Results</Heading>
            </Flex>
          </Flex>
          <VStack
            spacing={3}
            border="1px"
            borderColor="gray.200"
            p={5}
            width="60%"
            m={1}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Text size="md" fontWeight="bold">
                Winning Party
              </Text>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="Center"
              width="100%"
            >
              <Heading>
                {parties.length === 1 ? parties[0].name : 'TIE'}
              </Heading>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Text>
                {parties.length === 1
                  ? parties[0].president
                  : 'The Election Commission has been notified of the tie.'}
              </Text>
            </Stack>
            <Button variant="ghost" colorScheme="teal" onClick={onOpenParty}>
              Details
            </Button>
          </VStack>
          <VStack
            spacing={4}
            border="1px"
            borderColor="gray.200"
            p={5}
            width="60%"
            height="20vw"
            overflow="auto"
            m={5}
          >
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              m={3}
            >
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Region</Th>
                    <Th>Results</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {votes.map((e, i) => {
                    return (
                      <Tr>
                        <Td>{e.regionName}</Td>
                        <Td>
                          <Button
                            size="sm"
                            onClick={() => {
                              setCandidates(e.candidates);
                              setSelectedRegion(e.regionName);
                              onOpen();
                            }}
                          >
                            VIEW
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Stack>
          </VStack>
          <ViewModal
            isOpen={isOpen}
            onClose={onClose}
            candidates={candidates}
            selectedRegion={selectedRegion}
          />
          <ViewModalParty
            isOpen={isOpenParty}
            onClose={onCloseParty}
            parties={parties}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const ViewModal = ({ isOpen, onClose, candidates, selectedRegion }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">{selectedRegion}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <VStack
              spacing={4}
              border="1px"
              borderColor="gray.200"
              p={5}
              width="100%"
              height="60vh"
              overflow="auto"
            >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Position</Th>
                    <Th>Candidate Name</Th>
                    <Th>Party</Th>
                    <Th>Votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {candidates.map((e, i) => {
                    return (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{e.name}</Td>
                        <Td>{e.partyName}</Td>
                        <Td>{e.votes}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ViewModalParty = ({ isOpen, onClose, parties }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">Party Wise Breakdown</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <VStack
              spacing={4}
              border="1px"
              borderColor="gray.200"
              p={5}
              width="100%"
              height="60vh"
              overflow="auto"
            >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Position</Th>
                    <Th>Party Name</Th>
                    <Th>President</Th>
                    <Th>Votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {parties.map((e, i) => {
                    console.log(e);
                    return (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{e.name}</Td>
                        <Td>{e.president}</Td>
                        <Td>{e.votes}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(ViewResults);
