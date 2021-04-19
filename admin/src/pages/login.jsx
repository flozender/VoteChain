import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Heading,
  Text,
  Flex,
  Button,
  Container,
  Input,
  useToast,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  PinInput,
  PinInputField,
  HStack,
} from '@chakra-ui/react';
import fetchApi from '../services/fetch-custom.js';

const Login = props => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const success = () => {
      setLoading(false);
      toast({
        position: 'bottom-left',
        title: 'OTP Sent',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      onOpen();
    };

    if (!username || !password) {
      toast({
        position: 'bottom-left',
        title: 'Missing Fields.',
        description: 'Please fill in all the data.',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      const body = data;
      fetchApi('/admin/auth', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          success();
        })
        .catch(err => {
          console.log(err);
          toast({
            position: 'bottom-left',
            title: 'Could not log you in',
            description: err.message,
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  const { username, password } = data;

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        textAlign="center"
        fontSize="md"
        p={6}
        borderRadius="md"
        flexDirection="column"
        justifyContent="space-between"
        width="85%"
        alignItems="center"
        height="50vh"
        className="arrange-to-top"
      >
        <Container
          width="60%"
          alignItems="center"
          rounded="md"
          flexDirection="column"
          borderColor="teal"
          borderWidth="2px"
          borderStyle="solid"
          height="80vh"
        >
          <Heading fontSize="2xl" mt={4}>
            Sign In
          </Heading>
          <Flex
            textAlign="center"
            fontSize="md"
            p={6}
            borderRadius="md"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              name="username"
              placeholder="Username"
              marginBottom="40px"
              onChange={handleChange}
              value={username}
            />
            <Input
              name="password"
              placeholder="Password"
              marginBottom="40px"
              onChange={handleChange}
              value={password}
              type="password"
            />
            <Button
              colorScheme="teal"
              size="lg"
              width="10vw"
              isLoading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        </Container>
      </Flex>
      <OTPModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        {...props}
      />
    </Flex>
  );
};

const OTPModal = ({
  isOpen,
  onClose,
  setCurrentUser,
  history,
  data,
  setData,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setData(data => ({ ...data, otp: e }));
  };

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
      fetchApi('/admin/otp', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          setCurrentUser({
            ...json,
          });
          localStorage.setItem('app-user', JSON.stringify(json));
          toast({
            position: 'bottom-left',
            title: 'Success',
            description: 'Welcome back.',
            status: 'success',
            duration: 1500,
            isClosable: true,
          });
          setLoading(false);
          onClose();
          history.push('/');
        })
        .catch(err => {
          console.log(err);
          toast({
            position: 'bottom-left',
            title: 'OTP is incorrect',
            status: 'error',
            duration: 1000,
            isClosable: true,
          });
          setLoading(false);
          onClose();
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter OTP</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Flex flexDir="column" alignItems="center">
            <Text size="sm" color="gray.500" mb={5}>
              An OTP has been sent to your registered email and mobile number
            </Text>
            <HStack width="70%" alignSelf="center">
              <PinInput otp onChange={handleChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            width="30%"
            isLoading={loading}
            onClick={handleSubmit}
            alignSelf="center"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withRouter(Login);
