import React, { useState, useEffect } from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Menu,
  MenuGroup,
  MenuItem,
  Button,
} from '@ui-kitten/components';

import { styles } from './styles';
import { url } from '../services/constants';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const PartyResultsScreen = ({ navigation, route }) => {
  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const { electionId, electionName } = route.params;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/getPartyWiseVotes/${electionId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: GLOBAL.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        setParty(json.parties);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setMessage("Couldn't load data!");
        setVisible(true);
        setLoading(false);
      });
  }, [url]);

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
              fontSize: 18,
              width: '70%',
              marginBottom: 5,
              textAlign: 'center',
              color: 'gray',
            }}
          >
            Party Standings for
          </Text>
          <Text
            category="h1"
            style={{
              fontSize: 40,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {electionName}
          </Text>
        </Layout>
        <Layout
          style={{
            ...styles.container,
            width: '90%',
            height: '70%',
            marginHorizontal: 'auto',
            borderWidth: 2,
            borderColor: 'gray',
            borderStyle: 'solid',
            marginBottom: 90,
          }}
        >
          <Menu style={{ backgroundColor: '#fff', width: 'auto' }}>
            {party.map(e => {
              return <PartyMenu party={e} />;
            })}
          </Menu>
        </Layout>
      </Layout>
    </>
  );
};

const PartyMenu = ({ party }) => {
  return (
    <MenuItem
      title={party.name}
      accessoryRight={props => {
        return <Text {...props}>{party.votes}</Text>;
      }}
    />
  );
};
