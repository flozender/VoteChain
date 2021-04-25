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
} from '@chakra-ui/react';
import '../assets/scroll.css';

const ViewResults = ({ history, currentUser, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const { electionID } = useParams();

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        textAlign="center"
        fontSize="md"
        p={3}
        m={2}
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
          mb={10}
        >
          <Flex
            alignItems="baseline"
            justifyContent="center"
            width="100%"
            mb={5}
          >
            <Heading width="100%">Election Results</Heading>
          </Flex>
          <VStack
            spacing={4}
            border="1px"
            borderColor="gray.200"
            p={5}
            width="60%"
            height="14vw"
            m={3}
          >
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
              m={3}
            >
              <Text size="md" fontWeight="bold">
                Winning Party
              </Text>
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="Center"
              width="100%"
              m={3}
            >
              <Heading>Party Name</Heading>
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Text> President Name</Text>
            </Stack>
          </VStack>
          <VStack
            spacing={4}
            border="1px"
            borderColor="gray.200"
            p={5}
            width="60%"
            height="20vw"
            m={6}
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
                  <Tr>
                    <Td>A</Td>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => {
                          onOpen();
                        }}
                      >
                        VIEW
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>B</Td>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => {
                          onOpen();
                        }}
                      >
                        VIEW
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>C</Td>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => {
                          onOpen();
                        }}
                      >
                        VIEW
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Stack>
          </VStack>
          <ViewModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const ViewModal = ({ isOpen, onClose }) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf="center">Region Name</ModalHeader>
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
              <Table variant="striped" size="sm" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Position</Th>
                    <Th>Candidate Name</Th>
                    <Th>Party</Th>
                    <Th>Votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>A</Td>
                    <Td>John Doe</Td>
                    <Td>TRS</Td>
                    <Td>49,000</Td>
                  </Tr>
                  <Tr>
                    <Td>B</Td>
                    <Td>John Doe</Td>
                    <Td>TRS</Td>
                    <Td>49,000</Td>
                  </Tr>
                  <Tr>
                    <Td>C</Td>
                    <Td>John Doe</Td>
                    <Td>TRS</Td>
                    <Td>49,000</Td>
                  </Tr>
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
