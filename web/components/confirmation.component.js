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

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateAuth = () => {
    navigation.navigate('Auth');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const { electionId, electionName } = route.params;

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
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            width: '70%',
            marginTop: 50,
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
            marginBottom: 20,
            fontWeight: 'bold',
          }}
        >
          {electionName}
        </Text>

        <Layout style={styles.tab}>
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
              backgroundColor: 'transparent',
              alignItems: 'center',
              width: '85%',
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                paddingBottom: 5,
                color: 'gray',
              }}
            >
              Block Hash
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                paddingBottom: 10,
                color: 'gray',
              }}
            >
              0x00b46c2526e227482ee2bbBf4c69e4674d262e75
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                paddingBottom: 5,
                color: 'gray',
              }}
            >
              Block Number
            </Text>
            <Text style={{ fontSize: 18, color: 'gray', marginBottom: 30 }}>
              0x6469
            </Text>
          </Layout>
        </Layout>

        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 5 }}>
          Winner
        </Text>
        <Text style={{ marginBottom: 35 }}>Declared on 28th April 2021</Text>
        <Button accessoryLeft={BackwardIcon} onPress={navigateAuth}>
          Go Home
        </Button>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};
