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
          <Menu style={{ backgroundColor: '#fff', width: 'auto' }}>
            <MenuGroup title="Region Name">
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
            </MenuGroup>
            <MenuGroup title="Region Name">
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
              <MenuItem
                title="Candidate Name1"
                accessoryRight={props => <Text {...props}>31</Text>}
              />
            </MenuGroup>
          </Menu>
        </Layout>
      </Layout>
    </>
  );
};
