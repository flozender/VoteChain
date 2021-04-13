import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, Flex, Button, Text } from '@chakra-ui/react';
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
            <Button colorScheme="green" alignSelf="flex-end">
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withRouter(Elections);
