import React, { useState } from "react";
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
} from "@ui-kitten/components";

import { styles } from "./styles";

export const CastVoteScreen = ({ navigation, route }) => {
  const [selection, setSelection] = useState({});
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateConfirmVote = (id) => {
    navigation.navigate("Confirm Vote", {
      candidateId: id,
      electionId,
    });
  };

  const { electionId } = route.params;

  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <CandidateCard
        key={index}
        {...item}
        selection={selection}
        onPress={() => setSelection(item)}
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
        style={{ ...styles.container, display: "flex", alignItems: "center" }}
      >
        <Layout
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{ fontSize: 30, alignSelf: "center", textAlign: "center" }}
          >
            {electionId}
          </Text>
        </Layout>
        <Layout
          style={{
            width: "100%",
            marginTop: 10,
            marginBottom: 30,
            height: "70%",
          }}
        >
          <List
            data={[
              {
                id: "JD-32",
                name: "Mr. John Doe",
                party: "ABC",
              },
              {
                id: "JD-84",
                name: "Mrs. Jane Doe",
                party: "CDE",
              },
              {
                id: "AD-44",
                name: "Mr. Alex Doe",
                party: "XYZ",
              },
            ]}
            renderItem={renderItem}
            style={{
              backgroundColor: "white",
            }}
          />
        </Layout>

        <Button
          style={{ width: "60%" }}
          accessoryRight={(props) => (
            <Icon {...props} name="arrow-forward-outline" />
          )}
          disabled={selection.id ? false : true}
          onPress={() => navigateConfirmVote(selection?.id)}
        >
          Select Candidate
        </Button>
      </Layout>
    </>
  );
};

export const CandidateCard = ({ id, name, party, selection, onPress }) => {
  const theme = useTheme();
  const selected = id && selection?.id === id;
  let activeStyles = {};
  if (selected) {
    activeStyles = {
      backgroundColor: "#8ed7ce",
      borderColor: "green",
      borderStyle: "solid",
      borderWidth: 2,
    };
  }
  return (
    <Layout
      style={{
        ...styles.card,
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        borderStyle: "dashed",
        borderColor: "gray",
        borderWidth: 1,
        ...activeStyles,
      }}
      onTouchEnd={onPress}
    >
      <Avatar
        style={{ height: 90, width: 90 }}
        source={require("../assets/avatar.png")}
      />
      <Layout
        style={{ backgroundColor: "#f4f4f4", ...activeStyles, borderWidth: 0 }}
      >
        <Text style={{ ...styles.cardText }}>{`${name}`}</Text>
        <Text style={{ ...styles.cardText }}>{`Party: ${party}`}</Text>
      </Layout>
    </Layout>
  );
};
