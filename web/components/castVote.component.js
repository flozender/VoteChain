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

import { styles } from './styles';
import { url } from '../services/constants';
import Popup from './popup.component';

export const CastVoteScreen = ({ navigation, route }) => {
  const [selection, setSelection] = useState({});
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Error!');
  const { electionId, electionName, candidates, region } = route.params;

  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateConfirmVote = candidate => {
    navigation.navigate('Confirm Vote', {
      candidate,
      electionId,
      electionName,
      region,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <CandidateCard
        key={index}
        {...item}
        selection={selection}
        onPress={() => {
          setSelection(item.candidate);
        }}
      />
    );
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
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{ fontSize: 30, alignSelf: 'center', textAlign: 'center' }}
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
            }}
          >
            {region}
          </Text>
        </Layout>
        <Layout
          style={{
            width: '100%',
            marginTop: 10,
            marginBottom: 30,
            height: '65%',
          }}
        >
          <List
            data={candidates}
            renderItem={renderItem}
            style={{
              backgroundColor: 'white',
            }}
          />
        </Layout>

        <Button
          style={{ width: '60%' }}
          accessoryRight={props => (
            <Icon {...props} name="arrow-forward-outline" />
          )}
          disabled={selection.id ? false : true}
          onPress={() => navigateConfirmVote(selection)}
        >
          Select Candidate
        </Button>
      </Layout>
      <Popup message={message} visible={visible} setVisible={setVisible} />
    </>
  );
};

export const CandidateCard = ({ candidate, selection, onPress, ...props }) => {
  const selected = candidate.id && selection?.id === candidate.id;
  let activeStyles = {};
  if (selected) {
    activeStyles = {
      backgroundColor: '#5fdba7',
      borderColor: 'green',
      borderStyle: 'solid',
      borderWidth: 2,
    };
  }
  return (
    <Layout
      style={{
        ...styles.card,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: 'gray',
        borderWidth: 1,
        ...activeStyles,
        ...props,
      }}
      onTouchEnd={onPress}
    >
      <Avatar
        style={{ height: 50, width: 50 }}
        source={require('../assets/avatar.png')}
      />
      <Layout
        style={{ backgroundColor: '#f4f4f4', ...activeStyles, borderWidth: 0 }}
      >
        <Text
          style={{ ...styles.cardText, fontWeight: 'bold' }}
        >{`${candidate.partyName}`}</Text>
        <Text
          style={{ ...styles.cardText, fontSize: 20 }}
        >{`${candidate.name}`}</Text>
      </Layout>
    </Layout>
  );
};
