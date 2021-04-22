import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import {
  Heading,
  Flex,
  Button,
  Text,
  VStack,
  Stack,
  useToast,
} from '@chakra-ui/react';
import fetchApi from '../services/fetch-custom.js';
import '../assets/scroll.css';

const Results = ({ history, currentUser, ...props }) => {
  const [data, setData] = useState({
    election: null,
  });
  const toast = useToast();
  const [value, setValue] = useState([]);
  const { election } = data;

  useEffect(() => {
    fetchApi('/admin/elections', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        json.elections = json.elections
          .filter(e => {
            return e.active;
          })
          .map(e => {
            return { label: e.name, value: e.id };
          });
        setValue(json.elections);
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

  const handleChange = e => {
    setData(data => ({ ...data, [e.field]: e.value }));
  };
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
            <Heading width="100%">Declare Results</Heading>
          </Flex>
          <VStack
            spacing={4}
            border="1px"
            borderColor="gray.200"
            p={5}
            width="45%"
            height="18vw"
          >
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              m={3}
            >
              <Text size="md">Select Election</Text>
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              m={3}
            >
              <Dropdown
                text="Elections"
                id="election"
                placeholder="Select Elections"
                data={value}
                handleCustomChange={handleChange}
                width="80%"
              />
            </Stack>
            <Stack
              spacing={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              m={3}
            >
              <Button colorScheme="teal" disabled={election ? false : true}>
                Count and Publish
              </Button>
            </Stack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
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

export default withRouter(Results);
