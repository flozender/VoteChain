import React from "react";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <>
      <TopNavigation title="Authenticate" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>
    </>
  );
};
