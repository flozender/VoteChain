import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthScreen } from "./auth.component";
import { DetailsScreen } from "./details.component";
import { OTPScreen } from "./otp.component";
import { ElectionsScreen } from "./elections.component";
import { SignOutScreen } from "./signOut.component";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Auth" component={AuthScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="OTP" component={OTPScreen} />
    <Screen name="Elections" component={ElectionsScreen} />
    <Screen name="Sign Out" component={SignOutScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
