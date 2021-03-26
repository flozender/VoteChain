import React, { useState } from "react";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { styles } from "./styles";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const OTPScreen = ({ navigation }) => {
  const [state, setState] = useState({
    OTP: "",
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateElections = () => {
    navigation.navigate("Elections");
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <>
      <TopNavigation
        title="VoteChain"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            width: "70%",
            marginTop: 150,
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Enter OTP sent to your registered mobile number and email.
        </Text>
        <Input
          placeholder="One Time Password (OTP)"
          value={state.OTP}
          style={styles.input}
          onChangeText={(text) => setState({ ...state, OTP: text })}
        />
        <Button onPress={navigateElections}>Submit</Button>
      </Layout>
    </>
  );
};
