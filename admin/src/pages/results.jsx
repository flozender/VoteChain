import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Heading, Flex, Button, Text, VStack, Stack } from '@chakra-ui/react';
import '../assets/scroll.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Results = ({ history }) => {
  const [data, setData] = useState({
    elections: '',
  });
  const { elections } = data;

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
                id="elections"
                placeholder="Select Elections"
                data={options}
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
              <Button
                colorScheme="teal"
                // onClick={() => submitData(data)}
              >
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
