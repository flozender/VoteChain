import React, { useState } from 'react';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Icon,
  useTheme,
  Avatar,
  List,
} from '@ui-kitten/components';
import { ActivityIndicator } from 'react-native';
import { CandidateCard } from './castVote.component';
import { styles } from './styles';
import { url } from '../services/constants';
import Popup from './popup.component';

export const ConfirmVoteScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');

  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const CheckIcon = props => <Icon {...props} name="checkmark-outline" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  const { electionId, electionName, candidate, region } = route.params;

  const handleSubmit = async () => {
    setLoading(true);

    const success = () => {
      setLoading(false);
      navigation.navigate('Confirmation', { electionId, electionName, region });
    };
    const body = {
      electionID: electionId,
      candidateID: candidate.id,
    };
    console.log(body, url);
    fetch(`${url}/vote`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: GLOBAL.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (!json.success) throw Error(json.message);
        success();
      })
      .catch(err => {
        console.log(err);
        setMessage(err.message || 'Voting failed!');
        setVisible(true);
        setLoading(false);
      });
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
        style={{ ...styles.container, display: 'flex', alignItems: 'center' }}
      >
        <Layout
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            marginTop: 30,
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            {electionName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'gray',
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 5,
              marginBottom: 15,
            }}
          >
            {region.regionName}
          </Text>
          <CandidateCard
            candidate={candidate}
            width="95%"
            selection={candidate}
          />
          <Layout
            style={{ display: 'flex', marginTop: '95%', alignItems: 'center' }}
          >
            <Button
              style={{ width: '40%' }}
              onPress={handleSubmit}
              accessoryLeft={
                loading
                  ? () => <ActivityIndicator color="white" size="small" />
                  : CheckIcon
              }
            >
              Confirm Vote
            </Button>
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                color: 'gray',
                fontStyle: 'italic',
                marginBottom: 10,
              }}
            >
              This action cannot be undone!
            </Text>
            <Button appearance="ghost" size="giant" onPress={navigateBack}>
              Back
            </Button>
          </Layout>
        </Layout>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};
