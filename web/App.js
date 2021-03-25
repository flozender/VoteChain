import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./components/navigation.component";
import { default as theme } from "./theme.json";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaView
        style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}
      >
        <AppNavigator />
      </SafeAreaView>
    </ApplicationProvider>
  </>
);
