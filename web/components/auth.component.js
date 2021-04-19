import React, { useState } from 'react';
import {
  Input,
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  Datepicker,
} from '@ui-kitten/components';
import Popup from './popup.component';
import { ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { url } from '../services/constants';

export const AuthScreen = ({ navigation }) => {
  const [state, setState] = useState({
    voterId: '',
    dateObj: null,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');

  const now = new Date();
  const minDate = new Date(1900, now.getMonth(), now.getDate());

  const handleSubmit = async () => {
    setLoading(true);

    const success = () => {
      setLoading(false);
      navigation.navigate('OTP', { voterId: state.voterId, dob: state.dob });
    };

    if (!state.voterId || !state.dateObj) {
      setMessage('Missing Fields!');
      setVisible(true);
      setLoading(false);
    } else {
      const offset = state.dateObj.getTimezoneOffset();
      state.dob = new Date(state.dateObj.getTime() - offset * 60 * 1000);
      state.dob = state.dob.toISOString().split('T')[0];
      const body = {
        voterId: state.voterId,
        dob: state.dob,
      };
      console.log(body, url);
      fetch(`${url}/auth`, {
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
          setMessage('Sign in failed!');
          setVisible(true);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <TopNavigation title="VoteChain" alignment="center" />
      <Divider />
      <Layout style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Text category="h1" style={styles.header}>
          Sign In
        </Text>
        <Input
          placeholder="Voter ID"
          value={state.voterId}
          style={styles.input}
          onChangeText={text => setState({ ...state, voterId: text })}
        />
        <Datepicker
          placeholder="Date of Birth"
          date={state.dateObj}
          style={styles.input}
          min={minDate}
          onSelect={date => setState({ ...state, dateObj: date })}
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
