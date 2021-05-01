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
  Spinner,
} from '@ui-kitten/components';

import { styles } from './styles';
import Popup from './popup.component';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const ResultsScreen = ({ navigation, route }) => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Error!');
  const [visible, setVisible] = useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const { electionId, electionName } = route.params;

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
            Regional Breakdown for
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
          {loading ? (
            <Spinner />
          ) : (
            <Menu style={{ backgroundColor: '#fff', width: 'auto' }}>
              {votes.map(e => {
                return (
                  <MenuGroup title={e.regionName}>
                    <CandidateMenu candidates={e.candidates} />
                  </MenuGroup>
                );
              })}
            </Menu>
          )}
        </Layout>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};

const CandidateMenu = ({ candidates }) => {
  return candidates.map((e, i) => (
    <MenuItem
      key={i}
      title={e.name}
      accessoryRight={props => {
        return <Text {...props}>{e.votes}</Text>;
      }}
    />
  ));
};
