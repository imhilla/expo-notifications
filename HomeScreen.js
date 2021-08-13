import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import { auth } from './firebase';
const userid = 'gfg0JHWi0DWItPV9WXJqIrVS5Uu1'
import { db } from './firebase';
import { dbRef } from './firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [response, setResponse] = useState('')

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // console.log(notification.request, 'notification')
      setNotification(notification);
    });
    // 
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response.notification, 'response');
      navigation.navigate('Profile', {
        // notificationTitle: notificationTitle,
        // notificationData: notificationData,
        // notificationBody: notificationBody,
        notification: response,
      })
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [notification]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      {/* <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View> */}
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {

  }
})

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  db.ref('users/' + userid).set({
    expoPushToken: token
  })

  return token;
}


