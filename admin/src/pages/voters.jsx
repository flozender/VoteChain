import React, { useEffect, useState } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import fetchApi from '../services/fetch-custom.js';
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

const Voters = ({ history, currentUser, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [data, setData] = useState([]);
  const [prefilled, setPrefilled] = useState({});
  const columns = [
    { name: 'Voter ID', selector: 'id', sortable: true },
    {
      name: 'Name',
      sortable: true,
      cell: row => <div style={{ textAlign: 'left' }}>{row.name}</div>,
    },
    {
      name: 'DOB',
      selector: 'dob',
      sortable: true,
      cell: row => new Date(row.dob).toLocaleDateString(),
    },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'Mobile', selector: 'mobile', sortable: true },
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
      cell: row => (
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => {
            console.log('Setting', row);
            setPrefilled({ ...row });
            onOpen();
          }}
        >
          EDIT
        </Button>
      ),
    },
  ];
  useEffect(() => {
    fetchApi('/admin/voters', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setData(json.voters);
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
            <Heading width="100%">Voter Management</Heading>
            <Button
              colorScheme="green"
              alignSelf="flex-end"
              onClick={() => {
                setPrefilled({});
                onOpen();
              }}
            >
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
            prefilled={prefilled}
            setPrefilled={setPrefilled}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const CreateModal = ({
  isOpen,
  onClose,
  currentUser,
  prefilled,
  setPrefilled,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: '',
    name: '',
    dob: '',
    gender: '',
    assemblyConstituency: '',
    education: '',
    email: '',
    mobile: '',
  });

  const [values, setValues] = useState({
    states: [],
    assemblyConstituencies: [],
  });

  useEffect(() => {
    if (prefilled) {
      setData({
        id: prefilled.id,
        name: prefilled.name,
        dob: prefilled.dob
          ? new Date(prefilled.dob).toISOString().slice(0, 10)
          : '',
        gender: prefilled.gender?.toString(),
        assemblyConstituency: prefilled.assemblyConstituency,
        education: prefilled.education?.toString(),
        email: prefilled.email,
        mobile: prefilled.mobile,
      });
    }
  }, [prefilled]);

  useEffect(() => {
    fetchApi('/admin/states', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        const stateMap = json.states.map((e, i) => ({
          value: e.id,
          label: e.name,
        }));
        setValues(values => ({ ...values, states: stateMap }));
      })
      .catch(err => {
        console.log(err);
        toast({
          position: 'bottom-left',
          title: 'Could not load states',
          description: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });

    if (data.state) {
      fetchApi(`/admin/regions/${data.state}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          const regionMap = json.regions.map((e, i) => ({
            value: e.id,
            label: `${e.name} - ${e.pincode}`,
          }));
          setValues(values => ({
            ...values,
            assemblyConstituencies: regionMap,
          }));
        })
        .catch(err => {
          console.log(err);
          toast({
            position: 'bottom-left',
            title: 'Could not load ACs',
            description: err.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
        });
    }
  }, [currentUser, toast, data.state]);

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleChangeState = e => {
    setData(data => ({ ...data, [e.field]: e.label, state: e.value }));
  };

  const handleChangeAC = e => {
    setData(data => ({
      ...data,
      assemblyConstituency: e.value,
    }));
  };

  const { states, assemblyConstituencies } = values;

  const handleSubmit = () => {
    setLoading(true);
    if (Object.values(data).includes('')) {
      toast({
        title: 'Data missing.',
        description: 'Please fill in all details',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    } else {
      let url, method;
      if (prefilled.id) {
        url = `/admin/updateVoter/${prefilled.id}`;
        method = 'put';
      } else {
        url = '/admin/createVoter';
        method = 'post';
      }
      fetchApi(url, {
        method: method,
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
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          onClose();
          if (prefilled) {
            setPrefilled({});
          }
          setLoading(false);
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

  const {
    id,
    name,
    dob,
    gender,
    assemblyConstituency,
    education,
    email,
    mobile,
  } = data;

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
              <Text size="md">VoterID</Text>
              <Input
                name="id"
                placeholder="Enter Voter ID"
                onChange={handleChange}
                width="80%"
                value={id}
              />
            </Stack>
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
                width="80%"
                value={name}
              />
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">DOB</Text>
              <Input
                name="dob"
                placeholder="Date of Birth"
                type="date"
                onChange={handleChange}
                width="80%"
                value={dob}
              />
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">Email</Text>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                width="80%"
                value={email}
              />
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Text size="md">Mobile</Text>
              <Input
                name="mobile"
                placeholder="Mobile"
                onChange={handleChange}
                width="80%"
                value={mobile}
              />
            </Stack>
            <RadioGroup
              defaultValue="0"
              alignSelf="flex-start"
              onChange={value => setData(data => ({ ...data, gender: value }))}
              name="gender"
              width="100%"
              value={gender}
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
            <RadioGroup
              alignSelf="flex-start"
              onChange={value =>
                setData(data => ({ ...data, education: value }))
              }
              name="education"
              width="100%"
              value={education}
            >
              <Stack
                spacing={5}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Text size="md"> Educated </Text>
                <Radio value="0">No</Radio>
                <Radio value="1">Yes</Radio>
              </Stack>
            </RadioGroup>
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
                data={states}
                handleCustomChange={handleChangeState}
                width="80%"
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
                data={assemblyConstituencies}
                handleCustomChange={handleChangeAC}
                width="80%"
              />
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            width="50%"
            isLoading={loading}
            onClick={handleSubmit}
          >
            SAVE
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
  ...props
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
      {...props}
    />
  );
};

export default withRouter(Voters);
