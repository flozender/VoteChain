import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  List,
  ListItem,
  useTheme,
  Spinner,
} from '@ui-kitten/components';

import { styles } from './styles';
import { url } from '../services/constants';
import Popup from './popup.component';

export const ElectionsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);

  const navigateCastVote = (id, name, candidates, region) => {
    navigation.navigate('Cast Vote', {
      electionId: id,
      electionName: name,
      candidates,
      region,
    });
  };

  const navigateResults = (id, name) => {
    navigation.navigate('Results', {
      electionId: id,
      electionName: name,
    });
  };

  const navigateSignOut = () => {
    navigation.navigate('Sign Out');
  };

  const getItemColor = item => {
    return item.active
      ? theme['color-primary-default']
      : theme['color-basic-500'];
  };

  const renderItemAccessory = (props, item) => {
    return (
      <Button
        status={item.active ? null : 'disabled'}
        size="small"
        onPress={() => {
          if (item.active) {
            navigateCastVote(item.id, item.name, item.candidates, region);
          } else {
            navigateResults(item.id, item.name);
          }
        }}
      >
        {item.active ? 'VOTE' : 'VIEW'}
      </Button>
    );
  };

  const renderItem = ({ item, index }) => {
    item.startDate = new Date(item.startDate).toDateString();
    item.endDate = new Date(item.endDate).toDateString();
    return (
      <ListItem
        key={index}
        title={eva => (
          <Text
            {...eva}
            style={{
              color: getItemColor(item),
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {`${item.name}`}
          </Text>
        )}
        description={eva => (
          <>
            <Text
              {...eva}
              style={{
                fontSize: 13,
                color: 'gray',
              }}
            >
              {`${item.startDate} to ${item.endDate}`}
            </Text>
            <Text
              {...eva}
              style={{
                fontSize: 13,
                color: 'gray',
              }}
            >{`${item.location}`}</Text>
          </>
        )}
        accessoryRight={props => renderItemAccessory(props, item)}
        style={styles.card}
      />
    );
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/eligibleElections`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: GLOBAL.token,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success) throw Error(json.message);
        console.log(json.elections);
        setData(json.elections);
        setRegion(json.region);
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
      <TopNavigation title="VoteChain" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 30, alignSelf: 'center' }}>
            Eligible Elections
          </Text>
          <Button appearance="outline" size="small" onPress={navigateSignOut}>
            Sign Out
          </Button>
        </Layout>
        <Layout
          style={{
            width: '100%',
            marginTop: 10,
            marginBottom: 30,
            height: '80%',
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <List
              data={data}
              renderItem={renderItem}
              style={{
                backgroundColor: 'white',
                overflow: 'scroll',
              }}
            />
          )}
        </Layout>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};
