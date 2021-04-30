import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');
  const [votes, setVotes] = useState([]);
  const [winners, setWinners] = useState([]);

  const navigateAuth = () => {
    navigation.navigate('Auth');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const navigateResults = () => {
    navigation.navigate('Results', {
      electionId,
      electionName,
      currentVotes: votes,
    });
  };

  let { electionId, electionName, region } = route.params;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/getRegionWiseVotes/${electionId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: GLOBAL.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setVotes(json.votes);
        setWinners(json.winners);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setMessage("Couldn't load data!");
        setVisible(true);
        setLoading(false);
      });
  }, [url]);

  const currentRegion = votes.filter(e => e.regionID == region.regionID)[0];

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
              marginBottom: 15,
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
              {winners
                ? winners.length == 1
                  ? winners[0].partyName
                  : 'TIE'
                : 'TBD'}
            </Text>
            <Text
              style={{
                fontSize: 23,
              }}
            >
              {winners
                ? winners.length == 1
                  ? winners[0].name
                  : 'TIE'
                : 'TBD'}
            </Text>
          </Layout>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 0,
            }}
          >
            {votes.length > 0 ? `${currentRegion.regionName}'s winner` : ''}
          </Text>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
            }}
          >
            {votes.length > 0
              ? `${currentRegion.candidates[0].name}, ${currentRegion.candidates[0].partyName}`
              : ''}
          </Text>
          <Button
            style={{
              marginBottom: 20,
            }}
            onPress={navigateResults}
            disabled={votes ? false : true}
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
