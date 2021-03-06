import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen } from './auth.component';
import { OTPScreen } from './otp.component';
import { ElectionsScreen } from './elections.component';
import { CastVoteScreen } from './castVote.component';
import { ConfirmVoteScreen } from './confirmVote.component';
import { ConfirmationScreen } from './confirmation.component';
import { SignOutScreen } from './signOut.component';
import { ResultsScreen } from './results.component';
import { PartyResultsScreen } from './partyResults.component';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Auth" component={AuthScreen} />
    <Screen name="OTP" component={OTPScreen} />
    <Screen name="Elections" component={ElectionsScreen} />
    <Screen name="Cast Vote" component={CastVoteScreen} />
    <Screen name="Confirm Vote" component={ConfirmVoteScreen} />
    <Screen name="Confirmation" component={ConfirmationScreen} />
    <Screen name="Results" component={ResultsScreen} />
    <Screen name="Party Results" component={PartyResultsScreen} />
    <Screen name="Sign Out" component={SignOutScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
