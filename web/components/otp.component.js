import React, { useState } from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from '@ui-kitten/components';
import { ActivityIndicator } from 'react-native';
import { url } from '../services/constants';
import Popup from './popup.component';

import { styles } from './styles';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const OTPScreen = ({ navigation, route }) => {
  const [state, setState] = useState({
    OTP: '',
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const { voterId, dob } = route.params;
  const handleSubmit = async () => {
    setLoading(true);

    const success = json => {
      GLOBAL.voter = json.voter;
      GLOBAL.token = `Bearer ${json.token}`;
      console.log('voter', json.voter);
      console.log('token', json.token);
      setLoading(false);
      navigation.navigate('Elections', { reload: false });
    };

    if (!state.OTP) {
      setMessage('Missing Fields!');
      setVisible(true);
      setLoading(false);
    } else {
      const body = {
        otp: state.OTP,
        voterId,
        dob,
      };
      console.log(body);
      fetch(`${url}/otp`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) throw Error(json.message);
          success(json);
        })
        .catch(err => {
          console.log(err);
          setMessage('Sign in failed!');
          setVisible(true);
          setLoading(false);
          navigation.goBack();
        });
    }
  };

  return (
    <>
      <TopNavigation
        title="VoteChain"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text category="h1" style={styles.header}>
          Enter OTP
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: '70%',
            marginBottom: 40,
            textAlign: 'center',
            color: 'gray',
          }}
        >
          Enter OTP sent to your registered mobile number and email.
        </Text>
        <Input
          placeholder="One Time Password (OTP)"
          value={state.OTP}
          style={styles.input}
          onChangeText={text => setState({ ...state, OTP: text })}
        />
        <Button
          onPress={handleSubmit}
          accessoryLeft={
            loading
              ? () => <ActivityIndicator color="white" size="small" />
              : null
          }
        >
          Submit
        </Button>
        <Popup message={message} visible={visible} setVisible={setVisible} />
      </Layout>
    </>
  );
};
