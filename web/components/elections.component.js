import React, { useState } from "react";
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  List,
  ListItem,
  Icon,
  useTheme,
} from "@ui-kitten/components";

import { styles } from "./styles";

export const ElectionsScreen = ({ navigation }) => {
  const theme = useTheme();

  const navigateCastVote = (id) => {
    navigation.navigate("Cast Vote", { electionId: id });
  };

  const navigateSignOut = () => {
    navigation.navigate("Sign Out");
  };

  const getItemColor = (item) => {
    return item.active
      ? theme["color-primary-default"]
      : theme["color-basic-500"];
  };

  const renderItemAccessory = (props, item) => {
    return (
      <Button
        status={item.active ? null : "disabled"}
        size="small"
        onPress={() => navigateCastVote(item.id)}
      >
        {item.active ? "VOTE" : "VIEW"}
      </Button>
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={(eva) => (
        <Text
          {...eva}
          style={{
            color: getItemColor(item),
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {`${item.title}`}
        </Text>
      )}
      description={(eva) => (
        <Text
          {...eva}
          style={{
            fontSize: 13,
            color: "gray",
          }}
        >
          {`${item.description}`}
        </Text>
      )}
      accessoryRight={(props) => renderItemAccessory(props, item)}
      style={styles.card}
    />
  );

  return (
    <>
      <TopNavigation title="VoteChain" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Layout
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 30, alignSelf: "center" }}>
            Eligible Elections
          </Text>
          <Button appearance="outline" size="small" onPress={navigateSignOut}>
            Sign Out
          </Button>
        </Layout>
        <Layout
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 30,
            height: "80%",
          }}
        >
          <List
            data={[
              {
                id: "GA2021",
                title: "General Assembly 2021",
                description: "Hyderabad, Telangana",
                active: true,
              },
              {
                id: "SG2021",
                title: "State Government 2021",
                description: "Chennai, Tamil Nadu",
                active: true,
              },
              {
                id: "ME2020",
                title: "Municipal Elections 2020",
                description: "Bangalore, Karnataka",
                active: false,
              },
            ]}
            renderItem={renderItem}
            style={{
              backgroundColor: "white",
              overflow: "scroll",
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};
