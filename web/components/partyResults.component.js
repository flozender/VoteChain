import React, { useState } from 'react';
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

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const PartyResultsScreen = ({ navigation, route }) => {
  const [party, setParty] = useState([]);
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // const { electionId, electionName, currentVotes } = route.params;

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
            {/* {electionName} */}
            National Elections
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
            {/* {party.map(e => {
              return <partyMenu party={e.party} />;
            })} */}
          </Menu>
        </Layout>
      </Layout>
    </>
  );
};

const partyMenu = ({ party }) => {
  return party.map(e => (
    <MenuItem
      title={e.name}
      accessoryRight={props => {
        return <Text {...props}>{e.votes}</Text>;
      }}
    />
  ));
};
