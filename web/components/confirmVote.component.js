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
import { CandidateCard } from "./castVote.component";
import { styles } from "./styles";

export const ConfirmVoteScreen = ({ navigation, route }) => {
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

  const CheckIcon = (props) => <Icon {...props} name="checkmark-outline" />;
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  const { electionId, candidateId } = route.params;

  const navigateConfirmation = (id) => {
    navigation.navigate("Confirmation", { electionId });
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
            flex: 1,
            flexDirection: "column",
            width: "100%",
            marginTop: 30,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {electionId}
          </Text>
          <CandidateCard
            id={candidateId}
            name={candidateId}
            party={candidateId}
          />
          <Button
            style={{ width: "40%", marginTop: 20 }}
            accessoryLeft={CheckIcon}
            onPress={navigateConfirmation}
          >
            Confirm Vote
          </Button>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
              fontStyle: "italic",
              marginBottom: 10,
            }}
          >
            This action cannot be undone!
          </Text>
          <Button appearance="ghost" size="giant" onPress={navigateBack}>
            Back
          </Button>
        </Layout>
      </Layout>
    </>
  );
};
