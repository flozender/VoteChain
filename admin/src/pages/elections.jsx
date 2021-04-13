import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import '../assets/scroll.css';

const conditionalRowStyles = [
  {
    when: row => row.active,
    style: {
      backgroundColor: '#5fdba7',
      color: 'white',

      '&:hover': {
        color: 'white',
        backgroundColor: '#5fdba7',
      },
    },
  },
];

const data = [
  {
    id: 1,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    education: true,
    national: true,
    winner: {
      name: 'John Doe',
    },
  },
  {
    id: 2,
    name: 'General Municipal',
    location: 'Hyderabad',
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
  },
  {
    id: 3,
    name: 'General Municipal',
    location: 'Hyderabad',
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    education: true,
  },
  {
    id: 4,
    name: 'General Municipal',
    location: 'Hyderabad',
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 5,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 6,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 7,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 8,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 9,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
  {
    id: 10,
    name: 'General Municipal',
    location: 'Hyderabad',
    selected: true,
    startDate: '20/02/2021',
    endDate: '01/03/2021',
    assemblyConstituency: 'Nampally',
    minAge: '18',
    national: true,
  },
];
const columns = [
  { name: 'Election ID', selector: 'id', sortable: true },
  {
    name: 'Name',
    sortable: true,
    cell: row => (
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: 700 }}>{row.name}</div>
        {row.location}
      </div>
    ),
  },
  { name: 'Start Date', selector: 'startDate', sortable: true },
  { name: 'End Date', selector: 'endDate', sortable: true },
  {
    name: 'Assembly Constituency',
    selector: 'assemblyConstituency',
    sortable: true,
  },
  { name: 'Min Age', selector: 'minAge', sortable: true },
  {
    name: 'Education',
    sortable: true,
    cell: row => {
      if (row.education) {
        return <Text fontWeight="bold">Required</Text>;
      } else {
        return <Text>Not Required</Text>;
      }
    },
  },
  {
    name: 'National',
    sortable: true,
    cell: row => {
      if (row.national) {
        return <Text fontWeight="bold">Open</Text>;
      } else {
        return <Text>No</Text>;
      }
    },
  },
  {
    name: 'Winner',
    sortable: true,
    cell: row => <Text fontWeight="bold">{row.winner?.name}</Text>,
  },

  {
    name: 'Manage',
    right: true,
    cell: row => {
      if (row.active) {
        return (
          <Button size="sm" colorScheme="teal">
            EDIT
          </Button>
        );
      }
    },
  },
];

const Elections = ({ history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Heading width="100%">Election Management</Heading>
            <Button colorScheme="green" alignSelf="flex-end" onClick={onOpen}>
              CREATE
            </Button>
          </Flex>
          <DataTable
            noHeader={true}
            columns={columns}
            data={data}
            conditionalRowStyles={conditionalRowStyles}
            customStyles={{ table: { style: { marginBottom: '30px' } } }}
          />
          <CreateModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const CreateModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [data, setData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    minAge: '',
    assemblyConstituency: '',
    education: '0',
    national: '0',
  });

  const submitData = data => {
    if (Object.values(data).includes('')) {
      toast({
        title: 'Data missing.',
        description: 'Please fill in all the details',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Election created.',
        description: 'New election has been created',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Election</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              name="name"
              placeholder="Election Name"
              onChange={handleChange}
            />
            <Input
              name="startDate"
              placeholder="Start Date"
              type="date"
              onChange={handleChange}
            />
            <Input
              name="endDate"
              placeholder="End Date"
              type="date"
              onChange={handleChange}
            />
            <Input
              name="location"
              placeholder="Location"
              onChange={handleChange}
            />
            <Input
              name="minAge"
              placeholder="Minimum Age"
              value={data.minAge}
              type="number"
              onChange={handleChange}
            />
            <Input
              name="assemblyConstituency"
              placeholder="Assembly Constituency"
              onChange={handleChange}
            />
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
                <Heading size="md">Education</Heading>
                <Radio colorScheme="red" value="0">
                  Not Required
                </Radio>
                <Radio colorScheme="green" value="1">
                  Required
                </Radio>
              </Stack>
            </RadioGroup>
            <RadioGroup
              defaultValue="0"
              alignSelf="flex-start"
              onChange={value =>
                setData(data => ({ ...data, national: value }))
              }
              name="national"
              width="100%"
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Heading size="md">National</Heading>
                <Radio colorScheme="red" value="0">
                  Closed
                </Radio>
                <Radio colorScheme="green" value="1">
                  Open
                </Radio>
              </Stack>
            </RadioGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => submitData(data)}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Elections);
