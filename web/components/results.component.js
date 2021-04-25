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

export const ResultsScreen = ({ navigation, route }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const Votes1 = () => <Text>76</Text>;
  const Votes2 = () => <Text>66</Text>;

  const { electionId, electionName } = route.params;

  const [selectedIndex, setSelectedIndex] = React.useState(null);

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
              marginTop: 50,
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
            height: '60%',
            marginHorizontal: 'auto',
            borderWidth: 2,
            borderColor: 'gray',
            borderStyle: 'solid',
            marginBottom: 90,
          }}
        >
          <Menu
            style={{ backgroundColor: '#fff', width: 'auto' }}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
          >
            <MenuGroup title="Region Name">
              <MenuItem title="Candidate Name1" accessoryRight={Votes1} />
              <MenuItem title="Candidate Name2" accessoryRight={Votes2} />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem title="Candidate Name1" accessoryRight={Votes1} />
              <MenuItem title="Candidate Name2" accessoryRight={Votes2} />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem title="Candidate Name1" accessoryRight={Votes1} />
              <MenuItem title="Candidate Name2" accessoryRight={Votes2} />
            </MenuGroup>
          </Menu>
        </Layout>
      </Layout>
    </>
  );
};
