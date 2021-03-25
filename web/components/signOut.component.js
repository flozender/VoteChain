import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  Button,
} from "@ui-kitten/components";

export const SignOutScreen = ({ navigation }) => {
  const navigateAuthScreen = () => {
    navigation.popToTop();
  };
  return (
    <>
      <TopNavigation title="Sign Out" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Successfully signed out</Text>
        <Button onPress={navigateAuthScreen}>Exit</Button>
      </Layout>
    </>
  );
};
