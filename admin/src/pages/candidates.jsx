import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Heading,
  Flex,
  Button,
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import fetchApi from '../services/fetch-custom.js';
import '../assets/scroll.css';

const conditionalRowStyles = [];

const data = [
  {
    cid: 'CID5799100',
    name: 'Mr John Doe',
    age: '42',
    gender: 'Male',
    assemblyConstituency: 'Nampally',
    education: true,
    pid: 'ABC',
    active: false,
  },
  {
    cid: 'CID5799101',
    name: 'Mrs. Jane Doe',
    age: '35',
    gender: 'Female',
    assemblyConstituency: 'Secunderabad',
    education: true,
    pid: 'MIM',
    active: true,
  },
  {
    cid: 'CID5799102',
    name: 'Mr Alex Doe',
    age: '38',
    gender: 'Male',
    assemblyConstituency: 'Malakpet',
    education: false,
    pid: 'JDP',
    active: false,
  },
  {
    cid: 'CID5799103',
    name: 'Mr Peter Doe',
    age: '45',
    gender: 'Male',
    assemblyConstituency: 'Kukatpally',
    education: true,
    pid: 'CGG',
    active: false,
  },
  {
    cid: 'CID5799104',
    name: 'Mrs. Vanessa Doe',
    age: '32',
    gender: 'Female',
    assemblyConstituency: 'Medchal',
    education: true,
    pid: 'XYZ',
    active: true,
  },
  {
    cid: 'CID5799105',
    name: 'Mr Robert Doe',
    age: '48',
    gender: 'Male',
    assemblyConstituency: 'Secunderbad',
    education: false,
    pid: 'STP',
    active: false,
  },
  {
    cid: 'CID5799106',
    name: 'Mrs. Jennifer Doe',
    age: '46',
    gender: 'Female',
    assemblyConstituency: 'Medchal',
    education: true,
    pid: 'TDP',
    active: false,
  },
  {
    cid: 'CID5799107',
    name: 'Mr Kevin Doe',
    age: '53',
    gender: 'Male',
    assemblyConstituency: 'Nampally',
    education: false,
    pid: 'TRS',
    active: true,
  },
  {
    cid: 'CID5799108',
    name: 'Mr Jack Doe',
    age: '55',
    gender: 'Male',
    assemblyConstituency: 'Nampally',
    education: false,
    pid: 'BJP',
    active: false,
  },
  {
    cid: 'CID5799109',
    name: 'Mr Zack Doe',
    age: '42',
    gender: 'Male',
    assemblyConstituency: 'Malakpet',
    education: true,
    pid: 'ZTS',
    active: true,
  },
];

const columns = [
  { name: 'Candidate ID', selector: 'id', sortable: true },
  {
    name: 'Name',
    sortable: true,
    cell: row => <div style={{ textAlign: 'left' }}>{row.name}</div>,
  },
  { name: 'Age', selector: 'age', sortable: true },
  { name: 'Gender', selector: 'gender', sortable: true },
  {
    name: 'Assembly Constituency',
    selector: 'assemblyConstituency',
    sortable: true,
  },
  {
    name: 'Educated',
    sortable: true,
    cell: row => {
      if (row.education) {
        return <Text>Yes</Text>;
      } else {
        return <Text>No</Text>;
      }
    },
  },
  { name: 'Party ID', selector: 'partyID', sortable: true },
  {
    name: 'Manage',
    right: true,
    cell: row => (
      <Button size="sm" colorScheme="teal">
        EDIT
      </Button>
    ),
  },
];

const Candidates = ({ history, currentUser, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi('/admin/candidates', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setData(json.candidates);
      })
      .catch(err => {
        console.log(err);
        toast({
          position: 'bottom-left',
          title: 'Could not load data',
          description: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
  }, [currentUser, toast]);

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
        className="arrange-to-top"
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
            <Heading width="100%">Candidate Management</Heading>
            <Button colorScheme="green" alignSelf="flex-end" onClick={onOpen}>
              ENROLL
            </Button>
          </Flex>
          <DataTable
            noHeader={true}
            columns={columns}
            data={data}
            conditionalRowStyles={conditionalRowStyles}
            customStyles={{ table: { style: { marginBottom: '30px' } } }}
            noDataComponent={<Spinner size="lg" colorScheme="teal" />}
          />
          <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            currentUser={currentUser}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const CreateModal = ({ isOpen, onClose, currentUser }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    age: '',
    gender: '',
    assemblyConstituency: '',
    education: '0',
    partyID: '',
  });

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (Object.values(data).includes('')) {
      toast({
        title: 'Data missing.',
        description: 'Please fill in all details',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } else {
      fetchApi('/admin/createCandidate', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          toast({
            position: 'bottom-left',
            title: 'Success',
            description: 'Voter added.',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          setLoading(false);
          onClose();
        })
        .catch(err => {
          console.log(err);
          toast({
            position: 'bottom-left',
            title: 'Could not load data',
            description: err.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enroll/Edit Candidate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">Name</Text>
              <Input
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
                width="72%"
              />
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">Age</Text>
              <Input
                name="age"
                placeholder="Enter Age"
                onChange={handleChange}
                width="72%"
              />
            </Stack>
            <RadioGroup
              alignSelf="flex-start"
              onChange={value => setData(data => ({ ...data, gender: value }))}
              name="gender"
              width="100%"
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md"> Gender </Text>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Stack>
            </RadioGroup>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">AC</Text>
              <Input
                name="assemblyConstituency"
                placeholder="Assembly Constituency"
                onChange={handleChange}
                width="72%"
              />
            </Stack>
            <RadioGroup
              defaultValue="0"
              alignSelf="flex-start"
              onChange={value =>
                setData(data => ({ ...data, education: value }))
              }
              name="education"
              width="100%"
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md"> Educated </Text>
                <Radio value="No">No</Radio>
                <Radio value="Yes">Yes</Radio>
              </Stack>
            </RadioGroup>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              {/* TODO: This should be a dynamic dropdown */}
              <Text size="md">Party ID</Text>
              <Input
                name="partyID"
                placeholder="Enter Party ID"
                onChange={handleChange}
                width="72%"
              />
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" width="50%" onClick={handleSubmit}>
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Candidates);
