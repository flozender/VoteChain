import React, { useState } from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

import { styles } from './styles';
import { url } from '../services/constants';
import Popup from './popup.component';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackwardIcon = props => (
  <Icon {...props} name="corner-down-left-outline" />
);

export const ConfirmationScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');

  const navigateAuth = () => {
    navigation.navigate('Auth');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const navigateResults = () => {
    navigation.navigate('Results', { electionId, electionName });
  };

  // let { electionId, electionName } = route.params;
  let electionId = 1;
  let electionName = 'nnnn';

  return (
    <>
      <TopNavigation title="VoteChain" alignment="center" />
      <Divider />
      <Layout
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            width: '70%',
            marginTop: 25,
            marginBottom: 5,
            textAlign: 'center',
            color: 'gray',
          }}
        >
          Thank you for voting for
        </Text>
        <Text
          category="h1"
          style={{
            fontSize: 40,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 15,
          }}
        >
          {electionName}
        </Text>

        <Layout style={{ ...styles.tab, marginBottom: 50 }}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginVertical: 10,
              color: 'gray',
              fontStyle: 'italic',
            }}
          >
            Your vote has been successfully stored on our blockchain network,
            and can never be modified.
          </Text>

          <Layout
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
              width: '85%',
              marginHorizontal: 'auto',
              backgroundColor: '#fff',
              borderWidth: 2,
              borderColor: 'gray',
              borderStyle: 'solid',
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                paddingBottom: 5,
              }}
            >
              Winning Party
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: 5,
              }}
            >
              Party Name
            </Text>
            <Text
              style={{
                fontSize: 23,
              }}
            >
              President Name
            </Text>
          </Layout>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Region_Name Winner
          </Text>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}
          >
            Candidate Name
          </Text>
          <Button
            style={{
              marginBottom: 20,
            }}
            onPress={navigateResults}
          >
            Details
          </Button>
        </Layout>
        <Button accessoryLeft={BackwardIcon} onPress={navigateAuth}>
          Go Home
        </Button>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};
