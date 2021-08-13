import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { auth } from './firebase';
const userid = 'gfg0JHWi0DWItPV9WXJqIrVS5Uu1'
import { db } from './firebase';
import { dbRef } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: null,
            animationEnabled: false,
            stackAnimation: "none",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: null,
            animationEnabled: false,
            stackAnimation: "none",
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
