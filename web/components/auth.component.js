import React, { useState } from "react";
import {
  Input,
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  Datepicker,
} from "@ui-kitten/components";

import { styles } from "./styles";

export const AuthScreen = ({ navigation }) => {
  const [state, setState] = useState({
    voter_id: "",
    date_of_birth: "",
  });

  const navigateOTP = () => {
    navigation.navigate("OTP");
  };

  const now = new Date();
  const minDate = new Date(1900, now.getMonth(), now.getDate());

  return (
    <>
      <TopNavigation title="Authenticate" alignment="center" />
      <Divider />
      <Layout style={{ flex: 1, alignItems: "center" }}>
        <Text category="h1" style={styles.header}>
          Authenticate
        </Text>
        <Input
          placeholder="Voter ID"
          value={state.voter_id}
          style={styles.input}
          onChangeText={(text) => setState({ ...state, voter_id: text })}
        />
        <Datepicker
          placeholder="Date of Birth"
          date={state.date_of_birth ? state.date_of_birth : null}
          style={styles.input}
          min={minDate}
          onSelect={(date) => setState({ ...state, date_of_birth: date })}
        />
        <Button onPress={navigateOTP}>Submit</Button>
      </Layout>
    </>
  );
};
