import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
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

const groupedOptions = [
  {
    label: 'Locality 1',
    options: [
      { value: 'Region 1', label: 'Ocean', color: '#00B8D9' },
      { value: 'Region 2', label: 'Blue', color: '#0052CC' },
    ],
  },
  {
    label: 'Locality 2',
    options: [
      { value: 'Region 1', label: 'Ocean', color: '#00B8D9' },
      { value: 'Region 2', label: 'Blue', color: '#0052CC' },
    ],
  },
];

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

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

const Elections = ({ history }) => {
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

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
      button: true,
      ignoreRowClick: true,
      allowOverflow: true,
      cell: row => {
        if (row.active) {
          return (
            <Button size="sm" colorScheme="teal" onClick={onOpenAdd}>
              ADD
            </Button>
          );
        }
      },
    },
  ];

  const data = [
    {
      id: 1,
      name: 'General Municipal',
      location: 'Hyderabad',
      startDate: '20/02/2021',
      endDate: '01/03/2021',
      assemblyConstituency: 'Nampally',
      minAge: '18',
      active: true,
    },
  ];

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
            <Button
              colorScheme="green"
              alignSelf="flex-end"
              onClick={onOpenCreate}
            >
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
          <CreateModal isOpen={isOpenCreate} onClose={onCloseCreate} />
          <AddModal isOpen={isOpenAdd} onClose={onCloseAdd} />
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
  const { id, name } = data;

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
          <Button colorScheme="green" mr={3} onClick={() => submitData(data)}>
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

const AddModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [data, setData] = useState({
    state: '',
    locality: '',
    region: '',
    party: '',
    candidate: '',
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
        title: 'Candidate Added.',
        description: 'New candidate has been enrolled',
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
        <ModalHeader>Add Candidates</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <VStack
              spacing={4}
              border="1px"
              borderColor="gray.200"
              p={5}
              width="100%"
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md">State</Text>
                <Dropdown
                  text="State"
                  id="state"
                  placeholder="Select State"
                  data={options}
                  handleCustomChange={handleChange}
                  width="19vw"
                />
              </Stack>
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md">AC</Text>
                <Dropdown
                  text="Assembly Constituency"
                  id="assemblyConstituency"
                  placeholder="Select Assembly Constituency"
                  data={groupedOptions}
                  handleCustomChange={handleChange}
                  width="19vw"
                />
              </Stack>
            </VStack>
            <VStack
              spacing={4}
              border="1px"
              borderColor="gray.200"
              p={5}
              width="100%"
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md">Party</Text>
                <Dropdown
                  text="Party"
                  id="party"
                  placeholder="Select Party"
                  data={options}
                  handleCustomChange={handleChange}
                  width="19vw"
                />
              </Stack>
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md">Candidate</Text>
                <Dropdown
                  text="Candidate"
                  id="candidate"
                  placeholder="Select Candidate"
                  data={options}
                  handleCustomChange={handleChange}
                  width="19vw"
                />
              </Stack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => submitData(data)}>
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

const Dropdown = ({
  handleCustomChange,
  data,
  id,
  setFieldValue,
  width = '25vw',
}) => {
  const customStyles = {
    container: provided => ({
      ...provided,
      width: width,
      marginBottom: '10px',
    }),
  };
  return (
    <Select
      id={id}
      placeholder="Select Option"
      isRequired
      onChange={obj => {
        obj.field = id;
        handleCustomChange(obj, setFieldValue);
      }}
      styles={customStyles}
      options={data}
    />
  );
};

export default withRouter(Elections);
