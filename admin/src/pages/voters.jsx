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
    id: 'WRH2209786',
    name: 'Ali Affan',
    dob: '12/07/1999',
    gender: 'Male',
    assemblyConstituency: 'Nampally',
    education: true,
  },
  {
    id: 'WRH2209787',
    name: 'Mohammed Tayeeb Hasan',
    dob: '19/05/1999',
    gender: 'Male',
    assemblyConstituency: 'Secunderabad',
    education: true,
  },
  {
    id: 'WRH2209788',
    name: 'Catherine Teresa',
    dob: '10/09/1989',
    gender: 'Female',
    assemblyConstituency: 'Malakpet',
    education: false,
  },
  {
    id: 'WRH2209789',
    name: 'Boyapati Krishna Chandra',
    dob: '12/12/1999',
    gender: 'Male',
    assemblyConstituency: 'Kukatpally',
    education: true,
  },
  {
    id: 'WRH2209790',
    name: 'Anna Kendrick',
    dob: '09/08/1985',
    gender: 'Female',
    assemblyConstituency: 'Medchal',
    education: true,
  },
  {
    id: 'WRH2209791',
    name: 'V. Srinivas',
    dob: '24/10/1990',
    gender: 'Male',
    assemblyConstituency: 'Secunderbad',
    education: false,
  },
  {
    id: 'WRH2209792',
    name: 'S. Preethi',
    dob: '13/11/1995',
    gender: 'Female',
    assemblyConstituency: 'Medchal',
    education: true,
  },
  {
    id: 'WRH2209793',
    name: 'Sunny Rajesh',
    dob: '09/08/1985',
    gender: 'Male',
    assemblyConstituency: 'Nampally',
    education: false,
  },
  {
    id: 'WRH2209794',
    name: 'Ganga Sagar',
    dob: '01/01/2007',
    gender: 'Male',
    assemblyConstituency: 'Kukatpally',
    education: false,
  },
  {
    id: 'WRH2209795',
    name: 'Syed Ismail',
    dob: '15/06/1998',
    gender: 'Male',
    assemblyConstituency: 'Malakpet',
    education: true,
  },
];

const columns = [
  { name: 'Voter ID', selector: 'id', sortable: true },
  {
    name: 'Name',
    sortable: true,
    cell: row => (
      <div style={{ textAlign: 'left'}}>{row.name}</div>
    ),
  },
  { name: 'DOB', selector: 'dob', sortable: true },
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

const Voters = ({ history }) => {
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
            <Heading width="100%">Voter Management</Heading>
            <Button colorScheme="green" alignSelf="flex-end" onClick={onOpen}>
              ENROLL VOTER
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

const CreateModal = ({ isOpen, onClose}) => {
  const toast = useToast();
  const [data, setData] = useState({
    name: '',
    dob: '',
    gender: '',
    assemblyConstituency: '',
    education: '0',
  });

  const submitData = data => {
    if(Object.values(data).includes('')){
      toast({
        title: 'Data missing.',
        description: 'Please fill in all details',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Voter Enrolled.',
        description: 'New Voter has been enrolled',
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
        <ModalHeader>Enroll/Edit Voter</ModalHeader>
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
              <Text size='md'>VoterID</Text>
              <Input 
              name='voterId' 
              placeholder='Enter Voter ID'
              onChange = {handleChange}
              width='80%'
              />
            </Stack>
            <Stack 
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size='md'>Name</Text> 
              <Input 
              name='name' 
              placeholder='Enter Name'
              onChange = {handleChange}
              width='80%'
              />
            </Stack>
             <Stack 
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size='md'>DOB</Text>
              <Input 
              name='dob' 
              placeholder='Date of Birth'
              type='date'
              onChange = {handleChange}
              width='80%'
              />
            </Stack>
            <RadioGroup
              defaultValue="0"
              alignSelf="flex-start"
              onChange={value =>
                setData(data => ({ ...data, gender: value }))
              }
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
                <Radio value="0">
                  Male
                </Radio>
                <Radio value="1">
                  Female
                </Radio>
                <Radio value="2">
                  Others
                </Radio>
              </Stack>
            </RadioGroup>
            <Stack 
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size='md'>AC</Text>
              <Input
              name="assemblyConstituency"
              placeholder="Assembly Constituency"
              onChange={handleChange}
              width='80%'
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
                <Radio value="1">
                  Yes
                </Radio>
                <Radio value="0">
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='teal' width='50%'
          onClick={() => submitData(data)}>
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Voters);